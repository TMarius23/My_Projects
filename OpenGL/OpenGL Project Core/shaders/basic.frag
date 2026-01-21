#version 410 core

in vec3 fPosition;
in vec3 fNormal;
in vec2 fTexCoords;

out vec4 fColor;

//matrices
uniform mat4 model;
uniform mat4 view;
uniform mat3 normalMatrix;
//lighting
uniform vec3 lightDir;
uniform vec3 lightColor;

uniform vec3 lightPosEye1;
uniform vec3 lightPosEye2;
uniform vec3 lightColorBec;

// textures
uniform sampler2D diffuseTexture;
uniform sampler2D specularTexture;

in vec4 fragPosLightSpace;
uniform sampler2D shadowMap;

//components
vec3 ambient;
float ambientStrength = 0.1f;
vec3 diffuse;
vec3 specular;
float specularStrength = 0.5f;
float shininess = 32.0f;

vec3 totalAmbientPos = vec3(0.0);
vec3 totalDiffusePos = vec3(0.0);
vec3 totalSpecularPos = vec3(0.0);

float constant = 1.0f;
float linear = 0.7f;
float quadratic = 1.8f;


void computeDirLight()
{
    //compute eye space coordinates
    vec4 fPosEye = view * model * vec4(fPosition, 1.0f);
    vec3 normalEye = normalize(normalMatrix * fNormal);

    //normalize light direction
    vec3 lightDirN = vec3(normalize(view * vec4(lightDir, 0.0f)));

    //compute view direction (in eye coordinates, the viewer is situated at the origin
    vec3 viewDir = normalize(- fPosEye.xyz);

    //compute ambient light
    ambient = ambientStrength * lightColor;

    //compute diffuse light
    diffuse = max(dot(normalEye, lightDirN), 0.0f) * lightColor;

    //compute specular light
    vec3 reflectDir = reflect(-lightDirN, normalEye);
    float specCoeff = pow(max(dot(viewDir, reflectDir), 0.0f), 32);
    specular = specularStrength * specCoeff * lightColor;
}

float computeFog() {
    float fogDensity = 0.08f;
    vec4 fPosEye = view * model * vec4(fPosition, 1.0f);
    float fragmentDistance = length(fPosEye.xyz);
    float fogFactor = exp(-pow(fragmentDistance * fogDensity, 2));
    return clamp(fogFactor, 0.0f, 1.0f);
}

void computePointLightContribution(vec3 lightPos, vec4 fPosEye, vec3 normalEye, vec3 viewDir)
{
    //compute light direction
    vec3 lightDirNPos = normalize(lightPos - fPosEye.xyz);

    //compute distance to light
    float dist = length(lightPos - fPosEye.xyz);

    //compute attenuation
    float att = 1.0f / (constant + linear * dist + quadratic * (dist * dist));

    //acumulam ambient
    totalAmbientPos += att * ambientStrength * lightColorBec;

    //acumulam diffuse
    totalDiffusePos += att * max(dot(normalEye, lightDirNPos), 0.0f) * lightColorBec;

    //acumulam specular
    vec3 reflectDirPos = reflect(-lightDirNPos, normalEye);
    float specCoeffPos = pow(max(dot(viewDir, reflectDirPos), 0.0f), shininess);
    totalSpecularPos += att * specularStrength * specCoeffPos * lightColorBec;
}

float computeShadow()
{
    vec3 normalizedCoords = fragPosLightSpace.xyz / fragPosLightSpace.w;
    normalizedCoords = normalizedCoords * 0.5 + 0.5;
    if (normalizedCoords.z > 1.0f)
        return 0.0f;

    float closestDepth = texture(shadowMap, normalizedCoords.xy).r;
    float currentDepth = normalizedCoords.z;

    float bias = 0.005f;
    float shadow = (currentDepth - bias) > closestDepth ? 1.0f : 0.0f;

    return shadow;
}

void main()
{

    vec4 colorFromTexture = texture(diffuseTexture, fTexCoords);
    if (colorFromTexture.a < 0.1)
    {
        discard;
    }

    vec4 fPosEye = view * model * vec4(fPosition, 1.0f);
    vec3 normalEye = normalize(normalMatrix * fNormal);
    vec3 viewDir = normalize(- fPosEye.xyz);

    computeDirLight();
    computePointLightContribution(lightPosEye1, fPosEye, normalEye, viewDir);
    computePointLightContribution(lightPosEye2, fPosEye, normalEye, viewDir);


    vec3 finalAmbient = ambient + totalAmbientPos;
    vec3 finalDiffuse = diffuse + totalDiffusePos;
    vec3 finalSpecular = specular + totalSpecularPos;

    float shadow = computeShadow();
    //compute final vertex color

    vec3 lighting = (ambient + (1.0 - shadow) * diffuse) + (1.0 - shadow) * specular;

    lighting += totalAmbientPos + totalDiffusePos + totalSpecularPos;

    vec3 color = min(lighting * texture(diffuseTexture, fTexCoords).rgb + ((1.0 - shadow) * specular) * texture(specularTexture, fTexCoords).rgb, 1.0f);

//    vec3 color = min((finalAmbient + finalDiffuse) * texture(diffuseTexture, fTexCoords).rgb + finalSpecular * texture(specularTexture, fTexCoords).rgb, 1.0f);

    float fogFactor = computeFog();
    vec4 fogColor = vec4(0.5f, 0.5f, 0.5f, 1.0f);
    fColor = mix(fogColor, vec4(color, 1.0f), fogFactor);
}
