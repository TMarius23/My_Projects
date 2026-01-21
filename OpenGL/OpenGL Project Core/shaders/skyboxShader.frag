#version 410 core

//matrices
uniform mat4 model;
uniform mat4 view;
//lighting
uniform vec3 lightDir;
uniform vec3 lightColor;
// textures
uniform sampler2D diffuseTexture;
uniform sampler2D specularTexture;

//components
vec3 ambient;
float ambientStrength = 0.2f;
vec3 diffuse;
vec3 specular;
float specularStrength = 0.5f;
float shininess = 32.0f;



in vec3 textureCoordinates;
out vec4 color;

uniform samplerCube skybox;

float computeFog() {
    float lowerLimit = 0.0f;
    float upperLimit = 0.4f;
    float height = abs(textureCoordinates.y);

    float fogFactor = (height - lowerLimit) / (upperLimit - lowerLimit);

    fogFactor = clamp(fogFactor, 0.0f, 1.0f);
    return fogFactor;
}

void main()
{
//    vec3 viewDirectionN = normalize(viewDirection);
//    vec3 normalN = normalize(normal);
//    vec3 reflection = reflect(viewDirectionN, normalN);
//    vec3 colorFromSkybox = vec3(texture(skybox, reflection));

    vec4 color1 = texture(skybox, textureCoordinates);

//    vec3 color1 = min((ambient + diffuse) * texture(diffuseTexture, fTexCoords).rgb + specular * texture(specularTexture, fTexCoords).rgb, 1.0f);

    float fogFactor = computeFog();
    vec4 fogColor = vec4(0.5f, 0.5f, 0.5f, 1.0f);
    color = mix(fogColor, color1, fogFactor);

}
