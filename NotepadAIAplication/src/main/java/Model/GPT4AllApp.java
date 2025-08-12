package Model;

import okhttp3.*;
import org.json.JSONObject;

import javax.swing.*;
import java.awt.*;
import java.io.IOException;
import java.util.concurrent.TimeUnit;

public class GPT4AllApp {
    private static final String API_URL = "http://localhost:4891/v1/completions";
    private static final String MODEL_NAME = "Llama 3 8B Instruct";

//    public String sendToGPT4All(String prompt) throws IOException {
//        OkHttpClient client = new OkHttpClient.Builder()
//                .connectTimeout(300, TimeUnit.SECONDS)
//                .writeTimeout(300, TimeUnit.SECONDS)
//                .readTimeout(300, TimeUnit.SECONDS)
//                .build();
//
//        String json = "{\"model\":\"Llama 3 8B Instruct\",\"prompt\":\"Ce este recursivitatea?\",\"max_tokens\":100}";
//
//        Request request = new Request.Builder()
//                .url("http://localhost:4891/v1/completions")
//                .post(RequestBody.create(json, MediaType.get("application/json")))
//                .build();
//
//        try (Response response = client.newCall(request).execute()) {
//            if (!response.isSuccessful()) {
//                System.out.println("Eroare: " + response.code());
//                System.out.println(response.body().string());
//                return null;
//            }
//            String responseBody = response.body().string();
//            JSONObject obj = new JSONObject(responseBody);
//            String text = obj.getJSONArray("choices").getJSONObject(0).getString("text");
//            System.out.println("Răspuns: " + text);
//            return text;
//        }
//    }

    public String sendToGPT4All(String prompt) throws IOException {
        OkHttpClient client = new OkHttpClient.Builder()
                .connectTimeout(300, TimeUnit.SECONDS)
                .writeTimeout(300, TimeUnit.SECONDS)
                .readTimeout(300, TimeUnit.SECONDS)
                .build();

        String promptForSummary = "Rezuma textul următor si fi concis pe ce date ti-am dat. Incearca sa pastrezi detaliile esentiale si sa ai o structura clara:\n" + prompt;

        String json = new JSONObject()
                .put("model", MODEL_NAME)
                .put("prompt", promptForSummary)
                .put("max_tokens", 1000)
                .toString();

        Request request = new Request.Builder()
                .url(API_URL)
                .post(RequestBody.create(json, MediaType.get("application/json")))
                .build();

        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) {
                System.out.println("Eroare: " + response.code());
                System.out.println(response.body().string());
                return null;
            }
            String responseBody = response.body().string();
            JSONObject obj = new JSONObject(responseBody);
            String text = obj.getJSONArray("choices").getJSONObject(0).getString("text");
            System.out.println("Răspuns: " + text);
            return text.trim();
        }
    }

}
