package org.example.webcrawler;

import Model.Link;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Paragraph;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Node;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.ListView;
import javafx.scene.input.Clipboard;
import javafx.scene.input.ClipboardContent;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;

import java.awt.*;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URI;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import javafx.scene.control.TextField;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import com.itextpdf.text.pdf.PdfWriter;

public class ControlerView {

    private Link link;
    private String persistanceString;

    private Stage stage;
    private Scene scene;
    private Parent root;
    @FXML
    private TextField textField;
    @FXML
    private TextField textFieldPath;
    @FXML
    private TextField textFieldPath2;
    @FXML
    private ListView<String> listViewLink;
    @FXML
    private ListView<String> listViewTitlu;
    @FXML
    private ListView<String> listViewImg;

    @FXML
    public void resetLinkText(ActionEvent actionEvent) throws IOException {
        textField.setText("");
    }

    @FXML
    public void switchToScene2(ActionEvent actionEvent) throws IOException {
        Parent root = FXMLLoader.load(Objects.requireNonNull(getClass().getResource("Scene2.fxml")));
        Stage stage = (Stage) ((Node) actionEvent.getSource()).getScene().getWindow();
        scene = new Scene(root);
        stage.setScene(scene);
        stage.show();
    }

    public Set<String> extractLink(Link link) {
        Set<String> links = new HashSet<>();

        try {
            Document doc = Jsoup.connect(link.getUrl()).get();
            Elements anchorTags = doc.select("a[href]");
            for (Element anchorTag : anchorTags) {
                links.add(anchorTag.attr("abs:href"));
            }
        } catch (Exception e) {
            System.err.println("Eroare la conectarea cu site-ul: " + e.getMessage());
        }
        return links;
    }

    @FXML
    public void switchToSceneLink(ActionEvent actionEvent) throws IOException {
        FXMLLoader loader = new FXMLLoader(Objects.requireNonNull(getClass().getResource("SceneLink.fxml")));
        Parent root = loader.load();

        ControlerView controller = loader.getController();

        link = new Link(textField.getText());
        Set<String> links = extractLink(link);
        ObservableList<String> observableLinks = FXCollections.observableArrayList(links);
        controller.listViewLink.setItems(observableLinks);

        controller.listViewLink.setOnMouseClicked(_ -> {
            String selected = controller.listViewLink.getSelectionModel().getSelectedItem();
            if (selected != null) {
                ClipboardContent content = new ClipboardContent();
                content.putString(selected);
                Clipboard.getSystemClipboard().setContent(content);
                System.out.println("Copiat: " + selected);
            }
        });

        controller.listViewLink.setOnMouseClicked(event -> {
            if (event.getClickCount() == 2) {
                String selected = controller.listViewLink.getSelectionModel().getSelectedItem();
                if (selected != null) {
                    try {
                        Desktop.getDesktop().browse(new URI(selected));
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
            }
        });

        Stage stage = (Stage) ((Node) actionEvent.getSource()).getScene().getWindow();
        scene = new Scene(root);
        stage.setScene(scene);
        stage.show();
    }

    public Set<String> extractImage(Link link) {
        Set<String> links = new HashSet<>();

        try {
            Document doc = Jsoup.connect(link.getUrl()).get();
            Elements anchorTags = doc.select("img");
            for (Element img : anchorTags) {
                String src = img.absUrl("src");
                if (!src.isEmpty()) {
                    links.add(src);
                }
            }
        } catch (Exception e) {
            System.err.println("Eroare la conectarea cu site-ul: " + e.getMessage());
        }
        return links;
    }

    @FXML
    public void switchToSceneImage(ActionEvent actionEvent) throws IOException {
//        Parent root = FXMLLoader.load(Objects.requireNonNull(getClass().getResource("SceneImage.fxml")));
//        Stage stage = (Stage) ((Node) actionEvent.getSource()).getScene().getWindow();
//        scene = new Scene(root);
//        stage.setScene(scene);
//        stage.show();
        FXMLLoader loader = new FXMLLoader(Objects.requireNonNull(getClass().getResource("SceneImage.fxml")));
        Parent root = loader.load();

        ControlerView controller = loader.getController();

        link = new Link(textField.getText());
        Set<String> title = extractImage(link);
        ObservableList<String> observableLinks = FXCollections.observableArrayList(title);
        controller.listViewImg.setItems(observableLinks);

        controller.listViewImg.setOnMouseClicked(_ -> {
            String selected = controller.listViewImg.getSelectionModel().getSelectedItem();
            if (selected != null) {
                ClipboardContent content = new ClipboardContent();
                content.putString(selected);
                Clipboard.getSystemClipboard().setContent(content);
                System.out.println("Copiat: " + selected);
            }
        });

        controller.listViewImg.setOnMouseClicked(event -> {
            if (event.getClickCount() == 2) {
                String selected = controller.listViewImg.getSelectionModel().getSelectedItem();
                if (selected != null) {
                    try {
                        Desktop.getDesktop().browse(new URI(selected));
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
            }
        });

        Stage stage = (Stage) ((Node) actionEvent.getSource()).getScene().getWindow();
        scene = new Scene(root);
        stage.setScene(scene);
        stage.show();
    }

    public Set<String> extractTitle(Link link) {
        Set<String> title = new HashSet<>();

        try {
            Document doc = Jsoup.connect(link.getUrl()).get();
            Elements titles = doc.select("h1, h2, h3");

            for (Element t : titles) {
                title.add(t.text());
            }
        } catch (Exception e) {
            System.err.println("Eroare la conectarea cu site-ul: " + e.getMessage());
        }
        return title;
    }

    @FXML
    public void switchToSceneText(ActionEvent actionEvent) throws IOException {
//        Parent root = FXMLLoader.load(Objects.requireNonNull(getClass().getResource("SceneText.fxml")));
//        Stage stage = (Stage) ((Node) actionEvent.getSource()).getScene().getWindow();
//        scene = new Scene(root);
//        stage.setScene(scene);
//        stage.show();
        FXMLLoader loader = new FXMLLoader(Objects.requireNonNull(getClass().getResource("SceneText.fxml")));
        Parent root = loader.load();

        ControlerView controller = loader.getController();

        link = new Link(textField.getText());
        Set<String> title = extractTitle(link);
        ObservableList<String> observableLinks = FXCollections.observableArrayList(title);
        controller.listViewTitlu.setItems(observableLinks);

        controller.listViewTitlu.setOnMouseClicked(_ -> {
            String selected = controller.listViewTitlu.getSelectionModel().getSelectedItem();
            if (selected != null) {
                ClipboardContent content = new ClipboardContent();
                content.putString(selected);
                Clipboard.getSystemClipboard().setContent(content);
                System.out.println("Copiat: " + selected);
            }
        });

        Stage stage = (Stage) ((Node) actionEvent.getSource()).getScene().getWindow();
        scene = new Scene(root);
        stage.setScene(scene);
        stage.show();
    }


    @FXML
    public void StageSaveToPDFFormat(ActionEvent actionEvent) throws IOException {
//        Parent root = FXMLLoader.load(Objects.requireNonNull(getClass().getResource("ScenePDF.fxml")));
//        Stage stage = (Stage) ((Node) actionEvent.getSource()).getScene().getWindow();
//        scene = new Scene(root);
//        link = new Link(textField.getText());
//        stage.setScene(scene);
//        stage.show();

        FXMLLoader loader = new FXMLLoader(Objects.requireNonNull(getClass().getResource("ScenePDF.fxml")));
        Parent root = loader.load();

        ControlerView controller = loader.getController();
        controller.textFieldPath2.setText(textField.getText());

        Stage stage = (Stage) ((Node) actionEvent.getSource()).getScene().getWindow();
        scene = new Scene(root);
        stage.setScene(scene);
        stage.show();
    }

    @FXML
    public void saveToPDFFormat(ActionEvent actionEvent) throws IOException {

        link = new Link(textFieldPath2.getText());
        if(link == null){
            System.out.println("link null");
            return;
        }
        Set<String> title = extractTitle(link);
        Set<String> links = extractLink(link);
        Set<String> images = extractImage(link);

        try {
            com.itextpdf.text.Document pdfDoc = new com.itextpdf.text.Document();
            if (textFieldPath != null) {
                String pathSalvare = textFieldPath.getText() + "\\linkuri.pdf";
                System.out.println(pathSalvare);
                PdfWriter.getInstance(pdfDoc, new FileOutputStream(pathSalvare));
                pdfDoc.open();

                pdfDoc.add(new Paragraph("Link-uri"));
                pdfDoc.add(new Paragraph("\n"));

                for (String link : links) {
                    pdfDoc.add(new Paragraph(link));
                }

                pdfDoc.add(new Paragraph("\n"));
                pdfDoc.add(new Paragraph("Titluri:\n\n"));
                for (String t : title) {
                    pdfDoc.add(new Paragraph(t));
                }

                pdfDoc.add(new Paragraph("\n"));
                pdfDoc.add(new Paragraph("Imagini:\n\n"));
                for (String img : images) {
                    pdfDoc.add(new Paragraph(img));
                }

                pdfDoc.close();
                System.out.println("PDF creat cu succes!");
            }

            FXMLLoader loader = new FXMLLoader(Objects.requireNonNull(getClass().getResource("Scene2.fxml")));
            Parent root = loader.load();
            Stage stage = (Stage) ((Node) actionEvent.getSource()).getScene().getWindow();
            scene = new Scene(root);
            stage.setScene(scene);
            stage.show();
        } catch (DocumentException e) {
            throw new RuntimeException(e);
        }


    }

}
