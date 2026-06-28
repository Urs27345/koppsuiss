package com.koppsuisse.saludurs;

import android.Manifest;
import android.app.Activity;
import android.app.AlertDialog;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.provider.MediaStore;
import android.text.InputType;
import android.view.Gravity;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.ScrollView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.core.content.FileProvider;

import com.google.mlkit.vision.common.InputImage;
import com.google.mlkit.vision.text.TextRecognition;
import com.google.mlkit.vision.text.TextRecognizer;
import com.google.mlkit.vision.text.latin.TextRecognizerOptions;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStreamWriter;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class MainActivity extends Activity {
    private static final int REQUEST_CAMERA = 1001;
    private static final int REQUEST_PERMISSION_CAMERA = 1002;
    private static final String PREFS_NAME = "salud_urs_storage";
    private static final String PREF_ENTRIES = "blood_pressure_entries";

    private EditText systolicInput;
    private EditText diastolicInput;
    private EditText pulseInput;
    private TextView statusText;
    private TextView historyText;
    private ImageView previewImage;
    private Uri photoUri;
    private File currentPhotoFile;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        buildUi();
        refreshHistory();
    }

    private void buildUi() {
        ScrollView scrollView = new ScrollView(this);
        LinearLayout root = new LinearLayout(this);
        root.setOrientation(LinearLayout.VERTICAL);
        root.setPadding(dp(18), dp(18), dp(18), dp(30));
        scrollView.addView(root);

        TextView title = new TextView(this);
        title.setText("Salud Urs");
        title.setTextSize(28);
        title.setGravity(Gravity.CENTER_HORIZONTAL);
        title.setPadding(0, 0, 0, dp(6));
        root.addView(title);

        TextView subtitle = new TextView(this);
        subtitle.setText("Blutdruck-App · Version 3.0 · lokale Speicherung auf dem Handy");
        subtitle.setTextSize(14);
        subtitle.setGravity(Gravity.CENTER_HORIZONTAL);
        subtitle.setPadding(0, 0, 0, dp(18));
        root.addView(subtitle);

        systolicInput = numberInput("Systolisch / oberer Wert, z. B. 128");
        diastolicInput = numberInput("Diastolisch / unterer Wert, z. B. 82");
        pulseInput = numberInput("Puls, z. B. 72");
        root.addView(systolicInput);
        root.addView(diastolicInput);
        root.addView(pulseInput);

        Button cameraButton = button("Foto vom Messgerät aufnehmen und OCR starten");
        cameraButton.setOnClickListener(v -> startCameraWithPermission());
        root.addView(cameraButton);

        previewImage = new ImageView(this);
        previewImage.setAdjustViewBounds(true);
        previewImage.setMaxHeight(dp(260));
        previewImage.setPadding(0, dp(10), 0, dp(10));
        root.addView(previewImage);

        Button saveButton = button("Werte speichern");
        saveButton.setOnClickListener(v -> saveEntry());
        root.addView(saveButton);

        Button exportButton = button("CSV exportieren / teilen");
        exportButton.setOnClickListener(v -> exportCsv());
        root.addView(exportButton);

        Button clearButton = button("Lokalen Verlauf löschen");
        clearButton.setOnClickListener(v -> confirmClearHistory());
        root.addView(clearButton);

        statusText = new TextView(this);
        statusText.setText("Bereit.");
        statusText.setTextSize(14);
        statusText.setPadding(0, dp(14), 0, dp(14));
        root.addView(statusText);

        TextView historyTitle = new TextView(this);
        historyTitle.setText("Verlauf");
        historyTitle.setTextSize(22);
        historyTitle.setPadding(0, dp(12), 0, dp(8));
        root.addView(historyTitle);

        historyText = new TextView(this);
        historyText.setTextSize(15);
        historyText.setPadding(dp(8), dp(8), dp(8), dp(8));
        root.addView(historyText);

        setContentView(scrollView);
    }

    private EditText numberInput(String hint) {
        EditText input = new EditText(this);
        input.setHint(hint);
        input.setInputType(InputType.TYPE_CLASS_NUMBER);
        input.setTextSize(18);
        input.setSingleLine(true);
        input.setPadding(dp(10), dp(10), dp(10), dp(10));
        input.setLayoutParams(new LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT,
                LinearLayout.LayoutParams.WRAP_CONTENT
        ));
        return input;
    }

    private Button button(String text) {
        Button button = new Button(this);
        button.setText(text);
        button.setAllCaps(false);
        button.setTextSize(16);
        button.setPadding(dp(8), dp(8), dp(8), dp(8));
        LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT,
                LinearLayout.LayoutParams.WRAP_CONTENT
        );
        params.setMargins(0, dp(8), 0, 0);
        button.setLayoutParams(params);
        return button;
    }

    private int dp(int value) {
        return (int) (value * getResources().getDisplayMetrics().density + 0.5f);
    }

    private void startCameraWithPermission() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M
                && checkSelfPermission(Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED) {
            requestPermissions(new String[]{Manifest.permission.CAMERA}, REQUEST_PERMISSION_CAMERA);
            return;
        }
        openCamera();
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == REQUEST_PERMISSION_CAMERA) {
            if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                openCamera();
            } else {
                Toast.makeText(this, "Kamera-Berechtigung wurde nicht erteilt.", Toast.LENGTH_LONG).show();
            }
        }
    }

    private void openCamera() {
        try {
            File picturesDir = getExternalFilesDir(Environment.DIRECTORY_PICTURES);
            if (picturesDir == null) {
                picturesDir = getFilesDir();
            }
            String name = "salud_urs_" + new SimpleDateFormat("yyyyMMdd_HHmmss", Locale.US).format(new Date()) + ".jpg";
            currentPhotoFile = new File(picturesDir, name);
            photoUri = FileProvider.getUriForFile(this, BuildConfig.APPLICATION_ID + ".fileprovider", currentPhotoFile);

            Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
            intent.putExtra(MediaStore.EXTRA_OUTPUT, photoUri);
            intent.addFlags(Intent.FLAG_GRANT_WRITE_URI_PERMISSION | Intent.FLAG_GRANT_READ_URI_PERMISSION);
            startActivityForResult(intent, REQUEST_CAMERA);
            statusText.setText("Kamera geöffnet. Nach dem Foto startet die Texterkennung.");
        } catch (Exception ex) {
            statusText.setText("Kamera konnte nicht geöffnet werden: " + ex.getMessage());
            Toast.makeText(this, "Kamera konnte nicht geöffnet werden.", Toast.LENGTH_LONG).show();
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == REQUEST_CAMERA && resultCode == RESULT_OK && photoUri != null) {
            loadPreview();
            runOcr(photoUri);
        }
    }

    private void loadPreview() {
        try {
            Bitmap bitmap = BitmapFactory.decodeStream(getContentResolver().openInputStream(photoUri));
            previewImage.setImageBitmap(bitmap);
        } catch (Exception ignored) {
            previewImage.setVisibility(View.GONE);
        }
    }

    private void runOcr(Uri imageUri) {
        try {
            statusText.setText("OCR läuft. Bitte warten …");
            InputImage image = InputImage.fromFilePath(this, imageUri);
            TextRecognizer recognizer = TextRecognition.getClient(TextRecognizerOptions.DEFAULT_OPTIONS);
            recognizer.process(image)
                    .addOnSuccessListener(result -> {
                        String rawText = result.getText();
                        int[] values = parseBloodPressureValues(rawText);
                        showOcrConfirmation(values, rawText);
                    })
                    .addOnFailureListener(e -> statusText.setText("OCR fehlgeschlagen. Werte bitte manuell eintragen. Fehler: " + e.getMessage()));
        } catch (Exception ex) {
            statusText.setText("OCR konnte nicht gestartet werden. Werte bitte manuell eintragen. Fehler: " + ex.getMessage());
        }
    }

    private int[] parseBloodPressureValues(String rawText) {
        int sys = findAfterLabel(rawText, "SYS|SYST|SYSTOLIC|SYSTOLISCH");
        int dia = findAfterLabel(rawText, "DIA|DIAST|DIASTOLIC|DIASTOLISCH");
        int pul = findAfterLabel(rawText, "PUL|PULSE|PULS|PR|HR");

        List<Integer> numbers = extractNumbers(rawText);
        if (sys <= 0 && numbers.size() > 0) sys = numbers.get(0);
        if (dia <= 0 && numbers.size() > 1) dia = numbers.get(1);
        if (pul <= 0 && numbers.size() > 2) pul = numbers.get(2);

        if (!inRange(sys, 50, 260)) sys = 0;
        if (!inRange(dia, 30, 180)) dia = 0;
        if (!inRange(pul, 30, 220)) pul = 0;
        return new int[]{sys, dia, pul};
    }

    private int findAfterLabel(String rawText, String labelRegex) {
        String text = rawText == null ? "" : rawText.toUpperCase(Locale.US).replace('\n', ' ');
        Pattern pattern = Pattern.compile("(" + labelRegex + ")[^0-9]{0,12}(\\d{2,3})");
        Matcher matcher = pattern.matcher(text);
        if (matcher.find()) {
            try {
                return Integer.parseInt(matcher.group(2));
            } catch (Exception ignored) {
                return 0;
            }
        }
        return 0;
    }

    private List<Integer> extractNumbers(String rawText) {
        List<Integer> result = new ArrayList<>();
        String text = rawText == null ? "" : rawText.replace('O', '0').replace('o', '0');
        Matcher matcher = Pattern.compile("\\b\\d{2,3}\\b").matcher(text);
        while (matcher.find()) {
            try {
                int number = Integer.parseInt(matcher.group());
                if (inRange(number, 30, 260)) {
                    result.add(number);
                }
            } catch (Exception ignored) {
                // ignore invalid OCR fragments
            }
        }
        return result;
    }

    private boolean inRange(int value, int min, int max) {
        return value >= min && value <= max;
    }

    private void showOcrConfirmation(int[] values, String rawText) {
        String sysText = values[0] > 0 ? String.valueOf(values[0]) : "nicht erkannt";
        String diaText = values[1] > 0 ? String.valueOf(values[1]) : "nicht erkannt";
        String pulText = values[2] > 0 ? String.valueOf(values[2]) : "nicht erkannt";

        String message = "Erkannte Werte prüfen:\n\n"
                + "Systolisch: " + sysText + "\n"
                + "Diastolisch: " + diaText + "\n"
                + "Puls: " + pulText + "\n\n"
                + "Rohtext OCR:\n" + (rawText == null || rawText.trim().isEmpty() ? "Kein Text erkannt." : rawText.trim())
                + "\n\nWenn etwas falsch ist: Abbrechen drücken und Werte manuell eintragen.";

        new AlertDialog.Builder(this)
                .setTitle("OCR bestätigen")
                .setMessage(message)
                .setPositiveButton("Übernehmen", (dialog, which) -> {
                    if (values[0] > 0) systolicInput.setText(String.valueOf(values[0]));
                    if (values[1] > 0) diastolicInput.setText(String.valueOf(values[1]));
                    if (values[2] > 0) pulseInput.setText(String.valueOf(values[2]));
                    statusText.setText("OCR-Werte übernommen. Bitte prüfen und dann speichern.");
                })
                .setNegativeButton("Abbrechen", (dialog, which) -> statusText.setText("OCR abgebrochen. Werte bitte manuell eintragen."))
                .show();
    }

    private void saveEntry() {
        int sys = parseInput(systolicInput);
        int dia = parseInput(diastolicInput);
        int pul = parseInput(pulseInput);

        if (!inRange(sys, 50, 260) || !inRange(dia, 30, 180) || !inRange(pul, 30, 220)) {
            new AlertDialog.Builder(this)
                    .setTitle("Werte prüfen")
                    .setMessage("Bitte gültige Werte eintragen:\nSystolisch 50–260\nDiastolisch 30–180\nPuls 30–220")
                    .setPositiveButton("OK", null)
                    .show();
            return;
        }

        try {
            JSONArray entries = getEntries();
            JSONObject entry = new JSONObject();
            entry.put("timestamp", new SimpleDateFormat("yyyy-MM-dd HH:mm:ss", Locale.US).format(new Date()));
            entry.put("systolic", sys);
            entry.put("diastolic", dia);
            entry.put("pulse", pul);
            entry.put("photo", currentPhotoFile != null ? currentPhotoFile.getAbsolutePath() : "");
            entries.put(entry);
            saveEntries(entries);
            statusText.setText("Gespeichert: " + sys + "/" + dia + " mmHg, Puls " + pul);
            systolicInput.setText("");
            diastolicInput.setText("");
            pulseInput.setText("");
            refreshHistory();
        } catch (Exception ex) {
            statusText.setText("Speichern fehlgeschlagen: " + ex.getMessage());
        }
    }

    private int parseInput(EditText input) {
        try {
            return Integer.parseInt(input.getText().toString().trim());
        } catch (Exception ignored) {
            return 0;
        }
    }

    private JSONArray getEntries() {
        try {
            SharedPreferences prefs = getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
            String json = prefs.getString(PREF_ENTRIES, "[]");
            return new JSONArray(json);
        } catch (Exception ignored) {
            return new JSONArray();
        }
    }

    private void saveEntries(JSONArray entries) {
        getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
                .edit()
                .putString(PREF_ENTRIES, entries.toString())
                .apply();
    }

    private void refreshHistory() {
        JSONArray entries = getEntries();
        if (entries.length() == 0) {
            historyText.setText("Noch keine Messungen gespeichert.");
            return;
        }

        StringBuilder builder = new StringBuilder();
        for (int i = entries.length() - 1; i >= 0; i--) {
            try {
                JSONObject entry = entries.getJSONObject(i);
                builder.append(entry.optString("timestamp"))
                        .append("  ·  ")
                        .append(entry.optInt("systolic"))
                        .append("/")
                        .append(entry.optInt("diastolic"))
                        .append(" mmHg  ·  Puls ")
                        .append(entry.optInt("pulse"))
                        .append("\n");
            } catch (Exception ignored) {
                // skip broken entry
            }
        }
        historyText.setText(builder.toString());
    }

    private void exportCsv() {
        try {
            JSONArray entries = getEntries();
            if (entries.length() == 0) {
                Toast.makeText(this, "Keine Daten zum Exportieren vorhanden.", Toast.LENGTH_LONG).show();
                return;
            }

            File docsDir = getExternalFilesDir(Environment.DIRECTORY_DOCUMENTS);
            if (docsDir == null) {
                docsDir = getFilesDir();
            }
            if (!docsDir.exists()) {
                docsDir.mkdirs();
            }

            File csvFile = new File(docsDir, "salud-urs-blutdruck.csv");
            OutputStreamWriter writer = new OutputStreamWriter(new FileOutputStream(csvFile), StandardCharsets.UTF_8);
            writer.write("Zeitpunkt;Systolisch;Diastolisch;Puls;Foto\n");
            for (int i = 0; i < entries.length(); i++) {
                JSONObject entry = entries.getJSONObject(i);
                writer.write(csv(entry.optString("timestamp")) + ";"
                        + entry.optInt("systolic") + ";"
                        + entry.optInt("diastolic") + ";"
                        + entry.optInt("pulse") + ";"
                        + csv(entry.optString("photo")) + "\n");
            }
            writer.close();

            Uri uri = FileProvider.getUriForFile(this, BuildConfig.APPLICATION_ID + ".fileprovider", csvFile);
            Intent share = new Intent(Intent.ACTION_SEND);
            share.setType("text/csv");
            share.putExtra(Intent.EXTRA_STREAM, uri);
            share.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
            startActivity(Intent.createChooser(share, "CSV exportieren"));
            statusText.setText("CSV erstellt: " + csvFile.getAbsolutePath());
        } catch (Exception ex) {
            statusText.setText("CSV-Export fehlgeschlagen: " + ex.getMessage());
        }
    }

    private String csv(String value) {
        String v = value == null ? "" : value;
        return "\"" + v.replace("\"", "\"\"") + "\"";
    }

    private void confirmClearHistory() {
        new AlertDialog.Builder(this)
                .setTitle("Verlauf löschen")
                .setMessage("Alle lokal gespeicherten Messungen auf diesem Handy löschen?")
                .setPositiveButton("Löschen", (dialog, which) -> {
                    saveEntries(new JSONArray());
                    refreshHistory();
                    statusText.setText("Lokaler Verlauf gelöscht.");
                })
                .setNegativeButton("Abbrechen", null)
                .show();
    }
}
