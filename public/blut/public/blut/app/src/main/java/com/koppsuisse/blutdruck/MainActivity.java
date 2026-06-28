package com.koppsuisse.blutdruck;

import android.app.Activity;
import android.os.Bundle;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Typeface;
import android.text.InputType;
import android.view.Gravity;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.ScrollView;
import android.widget.TextView;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

public class MainActivity extends Activity {
    private static final String PREFS = "blutdruck_speicher";
    private static final String KEY_VALUES = "werte";

    private EditText obenInput;
    private EditText untenInput;
    private TextView bewertungText;
    private LinearLayout verlaufLayout;
    private SharedPreferences prefs;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        prefs = getSharedPreferences(PREFS, MODE_PRIVATE);
        buildUi();
        renderHistory();
    }

    private void buildUi() {
        ScrollView scroll = new ScrollView(this);
        LinearLayout root = new LinearLayout(this);
        root.setOrientation(LinearLayout.VERTICAL);
        root.setPadding(dp(18), dp(22), dp(18), dp(22));
        scroll.addView(root);

        TextView title = new TextView(this);
        title.setText("Blutdruck erfassen");
        title.setTextSize(26);
        title.setTypeface(Typeface.DEFAULT_BOLD);
        title.setGravity(Gravity.CENTER_HORIZONTAL);
        root.addView(title, matchWrap());

        TextView hint = new TextView(this);
        hint.setText("Oberen und unteren Wert in mmHg eintragen. Die Daten bleiben lokal auf diesem Handy.");
        hint.setTextSize(15);
        hint.setPadding(0, dp(10), 0, dp(18));
        root.addView(hint, matchWrap());

        obenInput = numberInput("Oberer Wert / systolisch, z.B. 120");
        untenInput = numberInput("Unterer Wert / diastolisch, z.B. 80");
        root.addView(label("Oberer Wert"));
        root.addView(obenInput, matchWrap());
        root.addView(label("Unterer Wert"));
        root.addView(untenInput, matchWrap());

        Button save = new Button(this);
        save.setText("Speichern");
        save.setOnClickListener(v -> saveValue());
        root.addView(save, matchWrapTop(14));

        bewertungText = new TextView(this);
        bewertungText.setTextSize(16);
        bewertungText.setPadding(0, dp(12), 0, dp(8));
        root.addView(bewertungText, matchWrap());

        LinearLayout row = new LinearLayout(this);
        row.setOrientation(LinearLayout.HORIZONTAL);
        row.setGravity(Gravity.CENTER);
        Button export = new Button(this);
        export.setText("CSV teilen");
        export.setOnClickListener(v -> shareCsv());
        Button undo = new Button(this);
        undo.setText("Letzten löschen");
        undo.setOnClickListener(v -> deleteLast());
        row.addView(export, weightWrap());
        row.addView(undo, weightWrap());
        root.addView(row, matchWrapTop(6));

        TextView subtitle = new TextView(this);
        subtitle.setText("Verlauf");
        subtitle.setTextSize(21);
        subtitle.setTypeface(Typeface.DEFAULT_BOLD);
        subtitle.setPadding(0, dp(20), 0, dp(8));
        root.addView(subtitle, matchWrap());

        verlaufLayout = new LinearLayout(this);
        verlaufLayout.setOrientation(LinearLayout.VERTICAL);
        root.addView(verlaufLayout, matchWrap());

        TextView note = new TextView(this);
        note.setText("Hinweis: Diese App ersetzt keine ärztliche Diagnose. Bei sehr hohen Werten oder Symptomen ärztliche Hilfe holen.");
        note.setTextSize(13);
        note.setPadding(0, dp(20), 0, 0);
        root.addView(note, matchWrap());

        setContentView(scroll);
    }

    private EditText numberInput(String hint) {
        EditText edit = new EditText(this);
        edit.setHint(hint);
        edit.setInputType(InputType.TYPE_CLASS_NUMBER);
        edit.setTextSize(18);
        edit.setSingleLine(true);
        edit.setPadding(0, dp(8), 0, dp(8));
        return edit;
    }

    private TextView label(String text) {
        TextView label = new TextView(this);
        label.setText(text);
        label.setTextSize(14);
        label.setTypeface(Typeface.DEFAULT_BOLD);
        label.setPadding(0, dp(8), 0, 0);
        return label;
    }

    private void saveValue() {
        String obenText = obenInput.getText().toString().trim();
        String untenText = untenInput.getText().toString().trim();

        if (obenText.isEmpty() || untenText.isEmpty()) {
            toast("Bitte beide Werte eintragen.");
            return;
        }

        int oben;
        int unten;
        try {
            oben = Integer.parseInt(obenText);
            unten = Integer.parseInt(untenText);
        } catch (NumberFormatException e) {
            toast("Bitte nur Zahlen eintragen.");
            return;
        }

        if (oben < 50 || oben > 260 || unten < 30 || unten > 160 || unten >= oben) {
            toast("Bitte Werte prüfen. Der obere Wert muss höher sein als der untere Wert.");
            return;
        }

        JSONArray arr = getHistory();
        JSONObject item = new JSONObject();
        try {
            item.put("timestamp", System.currentTimeMillis());
            item.put("oben", oben);
            item.put("unten", unten);
            item.put("bewertung", evaluate(oben, unten));
            arr.put(item);
            prefs.edit().putString(KEY_VALUES, arr.toString()).apply();
        } catch (JSONException e) {
            toast("Speichern fehlgeschlagen.");
            return;
        }

        obenInput.setText("");
        untenInput.setText("");
        bewertungText.setText(evaluate(oben, unten));
        renderHistory();
        toast("Gespeichert.");
    }

    private String evaluate(int oben, int unten) {
        if (oben >= 180 || unten >= 110) {
            return "Sehr hoher Blutdruck. Bitte zeitnah ärztlich abklären; bei Brustschmerz, Atemnot, Lähmung, Sprachstörung, starken Kopfschmerzen oder Sehstörung sofort Notfall.";
        }
        if (oben >= 160 || unten >= 100) return "Bluthochdruck Grad 2. Ärztlich kontrollieren lassen.";
        if (oben >= 140 || unten >= 90) return "Bluthochdruck Grad 1. Mehrfach messen und ärztlich besprechen.";
        if (oben >= 130 || unten >= 85) return "Hoch-normal / erhöht. Verlauf beobachten.";
        if (oben < 90 || unten < 60) return "Niedriger Blutdruck. Bei Schwindel, Schwäche oder Ohnmacht ärztlich abklären.";
        return "Im üblichen Normalbereich.";
    }

    private void renderHistory() {
        verlaufLayout.removeAllViews();
        JSONArray arr = getHistory();
        if (arr.length() == 0) {
            TextView empty = new TextView(this);
            empty.setText("Noch keine Einträge.");
            empty.setTextSize(15);
            verlaufLayout.addView(empty, matchWrap());
            return;
        }

        SimpleDateFormat sdf = new SimpleDateFormat("dd.MM.yyyy HH:mm", Locale.GERMANY);
        for (int i = arr.length() - 1; i >= 0; i--) {
            try {
                JSONObject item = arr.getJSONObject(i);
                int oben = item.getInt("oben");
                int unten = item.getInt("unten");
                long ts = item.getLong("timestamp");
                String bewertung = item.optString("bewertung", evaluate(oben, unten));

                TextView row = new TextView(this);
                row.setText(sdf.format(new Date(ts)) + "\n" + oben + " / " + unten + " mmHg\n" + bewertung);
                row.setTextSize(15);
                row.setPadding(dp(10), dp(10), dp(10), dp(10));
                row.setBackgroundResource(android.R.drawable.dialog_holo_light_frame);
                verlaufLayout.addView(row, matchWrapTop(8));
            } catch (JSONException ignored) { }
        }
    }

    private JSONArray getHistory() {
        String raw = prefs.getString(KEY_VALUES, "[]");
        try {
            return new JSONArray(raw);
        } catch (JSONException e) {
            return new JSONArray();
        }
    }

    private void deleteLast() {
        JSONArray arr = getHistory();
        if (arr.length() == 0) {
            toast("Kein Eintrag vorhanden.");
            return;
        }
        JSONArray next = new JSONArray();
        for (int i = 0; i < arr.length() - 1; i++) {
            try { next.put(arr.getJSONObject(i)); } catch (JSONException ignored) { }
        }
        prefs.edit().putString(KEY_VALUES, next.toString()).apply();
        bewertungText.setText("");
        renderHistory();
        toast("Letzter Eintrag gelöscht.");
    }

    private void shareCsv() {
        JSONArray arr = getHistory();
        if (arr.length() == 0) {
            toast("Keine Daten zum Teilen.");
            return;
        }
        SimpleDateFormat sdf = new SimpleDateFormat("dd.MM.yyyy HH:mm", Locale.GERMANY);
        StringBuilder csv = new StringBuilder("Datum;Oberer Wert;Unterer Wert;Bewertung\n");
        for (int i = 0; i < arr.length(); i++) {
            try {
                JSONObject item = arr.getJSONObject(i);
                csv.append(sdf.format(new Date(item.getLong("timestamp")))).append(';')
                        .append(item.getInt("oben")).append(';')
                        .append(item.getInt("unten")).append(';')
                        .append(item.optString("bewertung", "").replace(";", ",")).append('\n');
            } catch (JSONException ignored) { }
        }
        Intent sendIntent = new Intent(Intent.ACTION_SEND);
        sendIntent.setType("text/csv");
        sendIntent.putExtra(Intent.EXTRA_SUBJECT, "Blutdruck-Verlauf");
        sendIntent.putExtra(Intent.EXTRA_TEXT, csv.toString());
        startActivity(Intent.createChooser(sendIntent, "CSV teilen"));
    }

    private LinearLayout.LayoutParams matchWrap() {
        return new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT);
    }

    private LinearLayout.LayoutParams matchWrapTop(int marginTopDp) {
        LinearLayout.LayoutParams params = matchWrap();
        params.setMargins(0, dp(marginTopDp), 0, 0);
        return params;
    }

    private LinearLayout.LayoutParams weightWrap() {
        LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(0, LinearLayout.LayoutParams.WRAP_CONTENT, 1);
        params.setMargins(dp(4), 0, dp(4), 0);
        return params;
    }

    private int dp(int value) {
        return (int) (value * getResources().getDisplayMetrics().density + 0.5f);
    }

    private void toast(String text) {
        Toast.makeText(this, text, Toast.LENGTH_SHORT).show();
    }
}
