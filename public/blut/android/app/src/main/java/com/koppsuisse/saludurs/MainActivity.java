package com.koppsuisse.saludurs;

import android.Manifest;
import android.app.Activity;
import android.app.AlertDialog;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.provider.MediaStore;
import android.text.InputType;
import android.view.Gravity;
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
    private static final String PREFS_NAME = "salud_urs_blut_storage_v3";
    private static final String PREF_ENTRIES = "blood_pressure_entries";

    private EditText systolicInput;
    private EditText diastolicInput;
    private EditText pulseInput;
    private TextView statusText;
    private TextView historyText;
    private ImageView previewImage;
    private File currentPhotoFile;
    private String currentPhotoTime;

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
        root.setPadding(dp(18), dp(18), dp(18), dp(32));
        scrollView.addView(root);

        TextView title = new TextView(this);
        title.setText("Salud Urs");
        title.setTextSize(30);
        title.setGravity(Gravity.CENTER_HORIZONTAL);
        root.addView(title);

        TextView subtitle = new TextView(this);
        subtitle.setText("Blutdruck-App · Version 3.0 · Foto-Erkennung");
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

        Button cameraButton = button("Foto aufnehmen und Werte erkennen");
        cameraButton.setOnClickListener(v -> startCameraWithPermission());
        root.addView(cameraButton);

        previewImage = new ImageView(this);
        previewImage.setAdjustViewBounds(true);
        previewImage.setMaxHeight(dp(280));
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
        statusText.setText("Bereit. Foto aufnehmen oder Werte manuell eintragen.");
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
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M &&
                checkSelfPermission(Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED) {
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
            Intent cameraIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
            if (cameraIntent.resolveActivity(getPackageManager()) == null) {
                statusText.setText("Keine Kamera-App gefunden.");
                return;
            }
            startActivityForResult(cameraIntent, REQUEST_CAMERA);
            statusText.setText("Kamera geöffnet. Foto aufnehmen und mit OK bestätigen.");
        } catch (Exception e) {
            statusText.setText("Kamera konnte nicht geöffnet werden: " + safeError(e));
            Toast.makeText(this, "Kamera-Fehler", Toast.LENGTH_LONG).show();
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if (requestCode != REQUEST_CAMERA) return;

        if (resultCode != RESULT_OK) {
            statusText.setText("Foto wurde abgebrochen oder nicht übernommen.");
            return;
        }

        if (data == null || data.getExtras() == null || data.getExtras().get("data") == null) {
            statusText.setText("Foto konnte nicht übernommen werden. Bitte Werte manuell speichern.");
            return;
        }

        try {
            Bitmap bitmap = (Bitmap) data.getExtras().get("data");
            currentPhotoTime = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss", Locale.GERMANY).format(new Date());
            previewImage.setImageBitmap(bitmap);
            currentPhotoFile = saveBitmapToInternalFile(bitmap);
            statusText.setText("Foto gespeichert um " + currentPhotoTime + ". Werte-Erkennung läuft...");
            runOcr(bitmap);
        } catch (Exception e) {
            statusText.setText("Foto konnte nicht gespeichert werden: " + safeError(e));
        }
    }

    private File saveBitmapToInternalFile(Bitmap bitmap) throws Exception {
        File dir = new File(getFilesDir(), "photos");
        if (!dir.exists()) dir.mkdirs();

        String name = "salud_urs_" + new SimpleDateFormat("yyyyMMdd_HHmmss", Locale.GERMANY).format(new Date()) + ".jpg";
        File file = new File(dir, name);

        try (FileOutputStream out = new FileOutputStream(file)) {
            bitmap.compress(Bitmap.CompressFormat.JPEG, 90, out);
        }

        return file;
    }

    private void runOcr(Bitmap bitmap) {
        try {
            InputImage image = InputImage.fromBitmap(bitmap, 0);
            TextRecognizer recognizer = TextRecognition.getClient(TextRecognizerOptions.DEFAULT_OPTIONS);

            recognizer.process(image)
                    .addOnSuccessListener(visionText -> handleOcrText(visionText.getText()))
                    .addOnFailureListener(e -> statusText.setText("OCR fehlgeschlagen. Bitte Werte manuell eintragen. Fehler: " + safeError(e)));
        } catch (Exception e) {
            statusText.setText("OCR konnte nicht gestartet werden. Bitte Werte manuell eintragen. Fehler: " + safeError(e));
        }
    }

    private void handleOcrText(String text) {
        int[] values = extractLikelyValues(text);

        if (values[0] > 0) systolicInput.setText(String.valueOf(values[0]));
        if (values[1] > 0) diastolicInput.setText(String.valueOf(values[1]));
        if (values[2] > 0) pulseInput.setText(String.valueOf(values[2]));

        String message = "Fotozeit: " + (currentPhotoTime == null ? "unbekannt" : currentPhotoTime) + "\n";
        if (values[0] > 0 || values[1] > 0 || values[2] > 0) {
            message += "Erkannt: ";
            message += values[0] > 0 ? values[0] : "?";
            message += "/";
            message += values[1] > 0 ? values[1] : "?";
            message += " · Puls ";
            message += values[2] > 0 ? values[2] : "?";
            message += "\nBitte prüfen und speichern.";
        } else {
            message += "Keine sicheren Werte erkannt. Bitte manuell eintragen.";
        }
        statusText.setText(message);
    }

    private int[] extractLikelyValues(String text) {
        String cleaned = text == null ? "" : text.replace(',', ' ').replace('.', ' ');
        List<Integer> numbers = new ArrayList<>();

        Matcher matcher = Pattern.compile("\\b\\d{2,3}\\b").matcher(cleaned);
        while (matcher.find()) {
            try {
                int n = Integer.parseInt(matcher.group());
                if (n >= 30 && n <= 260) numbers.add(n);
            } catch (NumberFormatException ignored) {
            }
        }

        int sys = 0;
        int dia = 0;
        int pulse = 0;

        for (int i = 0; i < numbers.size(); i++) {
            int a = numbers.get(i);
            int b = i + 1 < numbers.size() ? numbers.get(i + 1) : 0;
            int c = i + 2 < numbers.size() ? numbers.get(i + 2) : 0;

            if (a >= 80 && a <= 240 && b >= 40 && b <= 160) {
                sys = a;
                dia = b;
                if (c >= 35 && c <= 180) pulse = c;
                return new int[]{sys, dia, pulse};
            }
        }

        for (int n : numbers) {
            if (sys == 0 && n >= 80 && n <= 240) {
                sys = n;
            } else if (dia == 0 && n >= 40 && n <= 160) {
                dia = n;
            } else if (pulse == 0 && n >= 35 && n <= 180) {
                pulse = n;
            }
        }

        return new int[]{sys, dia, pulse};
    }

    private void saveEntry() {
        Integer sys = parseInt(systolicInput.getText().toString());
        Integer dia = parseInt(diastolicInput.getText().toString());
        Integer pulse = parseInt(pulseInput.getText().toString());

        if (sys == null || dia == null || pulse == null) {
            Toast.makeText(this, "Bitte alle drei Werte eintragen.", Toast.LENGTH_LONG).show();
            return;
        }

        if (sys < 60 || sys > 260 || dia < 35 || dia > 180 || pulse < 30 || pulse > 220) {
            new AlertDialog.Builder(this)
                    .setTitle("Werte prüfen")
                    .setMessage("Mindestens ein Wert ist ungewöhnlich. Trotzdem speichern?")
                    .setPositiveButton("Speichern", (dialog, which) -> saveEntryConfirmed(sys, dia, pulse))
                    .setNegativeButton("Abbrechen", null)
                    .show();
            return;
        }

        saveEntryConfirmed(sys, dia, pulse);
    }

    private Integer parseInt(String value) {
        try {
            String clean = value.trim();
            if (clean.isEmpty()) return null;
            return Integer.parseInt(clean);
        } catch (NumberFormatException e) {
            return null;
        }
    }

    private void saveEntryConfirmed(int sys, int dia, int pulse) {
        try {
            JSONArray entries = getEntries();
            JSONObject entry = new JSONObject();

            String timestamp = currentPhotoTime != null ? currentPhotoTime :
                    new SimpleDateFormat("yyyy-MM-dd HH:mm:ss", Locale.GERMANY).format(new Date());

            entry.put("timestamp", timestamp);
            entry.put("photo_time", currentPhotoTime == null ? "" : currentPhotoTime);
            entry.put("systolic", sys);
            entry.put("diastolic", dia);
            entry.put("pulse", pulse);

            if (currentPhotoFile != null && currentPhotoFile.exists() && currentPhotoFile.length() > 0) {
                entry.put("photo", currentPhotoFile.getAbsolutePath());
            }

            entries.put(entry);
            saveEntries(entries);

            systolicInput.setText("");
            diastolicInput.setText("");
            pulseInput.setText("");
            currentPhotoTime = null;
            statusText.setText("Gespeichert.");
            refreshHistory();
        } catch (Exception e) {
            statusText.setText("Speichern fehlgeschlagen: " + safeError(e));
        }
    }

    private JSONArray getEntries() {
        SharedPreferences prefs = getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
        String json = prefs.getString(PREF_ENTRIES, "[]");
        try {
            return new JSONArray(json);
        } catch (Exception e) {
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
            historyText.setText("Noch keine gespeicherten Messungen.");
            return;
        }

        StringBuilder builder = new StringBuilder();
        for (int i = entries.length() - 1; i >= 0; i--) {
            try {
                JSONObject e = entries.getJSONObject(i);
                builder.append(e.optString("timestamp"))
                        .append("\n")
                        .append(e.optInt("systolic")).append("/")
                        .append(e.optInt("diastolic")).append(" mmHg")
                        .append(" · Puls ").append(e.optInt("pulse"));

                if (e.has("photo")) builder.append("\nFoto: gespeichert");

                builder.append("\n\n");
            } catch (Exception ignored) {
            }
        }
        historyText.setText(builder.toString());
    }

    private void exportCsv() {
        try {
            JSONArray entries = getEntries();
            if (entries.length() == 0) {
                Toast.makeText(this, "Keine Daten zum Exportieren.", Toast.LENGTH_LONG).show();
                return;
            }

            File exportFile = new File(getCacheDir(), "salud_urs_blutdruck.csv");
            try (OutputStreamWriter writer = new OutputStreamWriter(new FileOutputStream(exportFile), StandardCharsets.UTF_8)) {
                writer.write("timestamp;photo_time;systolic;diastolic;pulse;photo\n");
                for (int i = 0; i < entries.length(); i++) {
                    JSONObject e = entries.getJSONObject(i);
                    writer.write(csv(e.optString("timestamp")) + ";");
                    writer.write(csv(e.optString("photo_time")) + ";");
                    writer.write(e.optInt("systolic") + ";");
                    writer.write(e.optInt("diastolic") + ";");
                    writer.write(e.optInt("pulse") + ";");
                    writer.write(csv(e.optString("photo")) + "\n");
                }
            }

            Uri uri = FileProvider.getUriForFile(this, getPackageName() + ".fileprovider", exportFile);
            Intent share = new Intent(Intent.ACTION_SEND);
            share.setType("text/csv");
            share.putExtra(Intent.EXTRA_STREAM, uri);
            share.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
            startActivity(Intent.createChooser(share, "CSV exportieren"));
        } catch (Exception e) {
            statusText.setText("CSV-Export fehlgeschlagen: " + safeError(e));
        }
    }

    private String csv(String value) {
        String safe = value == null ? "" : value.replace("\"", "\"\"");
        return "\"" + safe + "\"";
    }

    private String safeError(Exception e) {
        if (e == null) return "unbekannt";
        String msg = e.getMessage();
        if (msg == null || msg.trim().isEmpty()) return e.getClass().getSimpleName();
        return msg;
    }

    private void confirmClearHistory() {
        new AlertDialog.Builder(this)
                .setTitle("Verlauf löschen")
                .setMessage("Alle lokal gespeicherten Blutdruckdaten löschen?")
                .setPositiveButton("Löschen", (dialog, which) -> {
                    saveEntries(new JSONArray());
                    refreshHistory();
                    statusText.setText("Lokaler Verlauf gelöscht.");
                })
                .setNegativeButton("Abbrechen", null)
                .show();
    }
}
