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
import java.io.IOException;
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
    private static final String PREFS_NAME = "salud_urs_blut_storage";
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
        root.setPadding(dp(18), dp(18), dp(18), dp(32));
        scrollView.addView(root);

        TextView title = new TextView(this);
        title.setText("Salud Urs");
        title.setTextSize(30);
        title.setGravity(Gravity.CENTER_HORIZONTAL);
        root.addView(title);

        TextView subtitle = new TextView(this);
        subtitle.setText("Blutdruck-App · Version 3.1 · lokal auf dem Android-Handy");
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

        Button cameraButton = button("Foto aufnehmen und Zahlen erkennen");
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
            File picturesDir = getExternalFilesDir(Environment.DIRECTORY_PICTURES);
            if (picturesDir == null) {
                picturesDir = getFilesDir();
            }
            String fileName = "salud_urs_" + new SimpleDateFormat("yyyyMMdd_HHmmss", Locale.GERMANY).format(new Date()) + ".jpg";
            currentPhotoFile = new File(picturesDir, fileName);
            photoUri = FileProvider.getUriForFile(this, getPackageName() + ".fileprovider", currentPhotoFile);

            Intent cameraIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
            cameraIntent.putExtra(MediaStore.EXTRA_OUTPUT, photoUri);
            cameraIntent.addFlags(Intent.FLAG_GRANT_WRITE_URI_PERMISSION | Intent.FLAG_GRANT_READ_URI_PERMISSION);
            startActivityForResult(cameraIntent, REQUEST_CAMERA);
            statusText.setText("Kamera geöffnet. Foto vom Messgerät aufnehmen.");
        } catch (Exception e) {
            statusText.setText("Kamera konnte nicht geöffnet werden: " + e.getMessage());
            Toast.makeText(this, "Kamera-Fehler", Toast.LENGTH_LONG).show();
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if (requestCode != REQUEST_CAMERA) {
            return;
        }

        if (resultCode != RESULT_OK) {
            statusText.setText("Foto wurde nicht übernommen.");
            return;
        }

        if (photoUri == null || currentPhotoFile == null) {
            statusText.setText("Foto konnte nicht gespeichert werden: Datei fehlt.");
            return;
        }

        if (!currentPhotoFile.exists() || currentPhotoFile.length() == 0) {
            statusText.setText("Foto wurde von der Kamera nicht korrekt gespeichert. Bitte nochmals versuchen.");
            return;
        }

        try {
            Bitmap previewBitmap = decodeSampledBitmap(currentPhotoFile.getAbsolutePath(), 1200, 1200);
            if (previewBitmap != null) {
                previewImage.setImageBitmap(previewBitmap);
            } else {
                previewImage.setImageURI(photoUri);
            }

            statusText.setText("Foto gespeichert. OCR läuft...");
            runOcr();
        } catch (OutOfMemoryError e) {
            statusText.setText("Foto ist zu groß für die Vorschau. OCR läuft trotzdem...");
            runOcr();
        } catch (Exception e) {
            statusText.setText("Foto wurde gespeichert, aber die Vorschau konnte nicht geladen werden: " + safeError(e));
            runOcr();
        }
    }

    private Bitmap decodeSampledBitmap(String path, int reqWidth, int reqHeight) {
        try {
            BitmapFactory.Options options = new BitmapFactory.Options();
            options.inJustDecodeBounds = true;
            BitmapFactory.decodeFile(path, options);

            int sampleSize = 1;
            int height = options.outHeight;
            int width = options.outWidth;

            while ((height / sampleSize) > reqHeight || (width / sampleSize) > reqWidth) {
                sampleSize *= 2;
            }

            BitmapFactory.Options decodeOptions = new BitmapFactory.Options();
            decodeOptions.inSampleSize = sampleSize;
            return BitmapFactory.decodeFile(path, decodeOptions);
        } catch (Exception e) {
            return null;
        }
    }

    private void runOcr() {
        try {
            if (photoUri == null || currentPhotoFile == null || !currentPhotoFile.exists() || currentPhotoFile.length() == 0) {
                statusText.setText("OCR nicht möglich: Foto-Datei fehlt oder ist leer.");
                return;
            }

            InputImage image = InputImage.fromFilePath(this, photoUri);
            TextRecognizer recognizer = TextRecognition.getClient(TextRecognizerOptions.DEFAULT_OPTIONS);
            recognizer.process(image)
                    .addOnSuccessListener(visionText -> handleOcrText(visionText.getText()))
                    .addOnFailureListener(e -> statusText.setText("OCR fehlgeschlagen. Bitte Werte manuell eintragen. Fehler: " + safeError(e)));
        } catch (IOException e) {
            statusText.setText("Bild konnte nicht gelesen werden. Bitte Werte manuell eintragen. Fehler: " + safeError(e));
        } catch (Exception e) {
            statusText.setText("OCR konnte nicht gestartet werden. Bitte Werte manuell eintragen. Fehler: " + safeError(e));
        }
    }

    private String safeError(Exception e) {
        if (e == null || e.getMessage() == null || e.getMessage().trim().isEmpty()) {
            return e == null ? "unbekannt" : e.getClass().getSimpleName();
        }
        return e.getMessage();
    }

    private void handleOcrText(String text) {
        int[] values = extractLikelyValues(text);
        String message = "Erkannter Text:\n\n" + text + "\n\n";
        if (values[0] > 0 || values[1] > 0 || values[2] > 0) {
            if (values[0] > 0) systolicInput.setText(String.valueOf(values[0]));
            if (values[1] > 0) diastolicInput.setText(String.valueOf(values[1]));
            if (values[2] > 0) pulseInput.setText(String.valueOf(values[2]));
            message += "Vorschlag übernommen. Bitte Werte prüfen und dann speichern.";
        } else {
            message += "Keine sicheren Werte erkannt. Bitte manuell eintragen.";
        }
        statusText.setText(message);
    }

    private int[] extractLikelyValues(String text) {
        List<Integer> numbers = new ArrayList<>();
        Matcher matcher = Pattern.compile("\\b\\d{2,3}\\b").matcher(text.replace(',', ' '));
        while (matcher.find()) {
            try {
                int n = Integer.parseInt(matcher.group());
                if (n >= 35 && n <= 260) numbers.add(n);
            } catch (NumberFormatException ignored) {
            }
        }

        int sys = 0;
        int dia = 0;
        int pulse = 0;

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
            entry.put("timestamp", new SimpleDateFormat("yyyy-MM-dd HH:mm:ss", Locale.GERMANY).format(new Date()));
            entry.put("systolic", sys);
            entry.put("diastolic", dia);
            entry.put("pulse", pulse);
            if (currentPhotoFile != null) {
                entry.put("photo", currentPhotoFile.getAbsolutePath());
            }
            entries.put(entry);
            saveEntries(entries);
            systolicInput.setText("");
            diastolicInput.setText("");
            pulseInput.setText("");
            statusText.setText("Gespeichert.");
            refreshHistory();
        } catch (Exception e) {
            statusText.setText("Speichern fehlgeschlagen: " + e.getMessage());
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
                        .append(" · Puls ").append(e.optInt("pulse"))
                        .append("\n\n");
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
                writer.write("timestamp;systolic;diastolic;pulse;photo\n");
                for (int i = 0; i < entries.length(); i++) {
                    JSONObject e = entries.getJSONObject(i);
                    writer.write(csv(e.optString("timestamp")) + ";");
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
            statusText.setText("CSV-Export fehlgeschlagen: " + e.getMessage());
        }
    }

    private String csv(String value) {
        String safe = value == null ? "" : value.replace("\"", "\"\"");
        return "\"" + safe + "\"";
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
