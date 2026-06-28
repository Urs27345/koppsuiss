package ch.koppsuisse.saluturs;

import android.app.Activity;
import android.os.Bundle;
import android.graphics.Color;
import android.graphics.Typeface;
import android.view.Gravity;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.ScrollView;
import android.graphics.drawable.GradientDrawable;

public class MainActivity extends Activity {
    private int dp(float value) {
        return (int) (value * getResources().getDisplayMetrics().density + 0.5f);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        ScrollView scroll = new ScrollView(this);
        scroll.setFillViewport(true);
        scroll.setBackgroundColor(Color.rgb(243, 246, 251));

        LinearLayout root = new LinearLayout(this);
        root.setOrientation(LinearLayout.VERTICAL);
        root.setGravity(Gravity.CENTER);
        root.setPadding(dp(22), dp(22), dp(22), dp(22));
        scroll.addView(root, new ScrollView.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.MATCH_PARENT
        ));

        LinearLayout card = new LinearLayout(this);
        card.setOrientation(LinearLayout.VERTICAL);
        card.setGravity(Gravity.CENTER);
        card.setPadding(dp(26), dp(30), dp(26), dp(30));

        GradientDrawable cardBg = new GradientDrawable();
        cardBg.setColor(Color.WHITE);
        cardBg.setCornerRadius(dp(18));
        card.setBackground(cardBg);

        LinearLayout.LayoutParams cardParams = new LinearLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.WRAP_CONTENT
        );
        cardParams.setMargins(0, 0, 0, 0);
        root.addView(card, cardParams);

        TextView title = new TextView(this);
        title.setText("Salut Urs");
        title.setTextSize(34);
        title.setTextColor(Color.rgb(7, 21, 47));
        title.setTypeface(Typeface.DEFAULT_BOLD);
        title.setGravity(Gravity.CENTER);
        card.addView(title, new LinearLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.WRAP_CONTENT
        ));

        TextView text = new TextView(this);
        text.setText("\nAndroid-App installiert.\n\nMinimalversion funktioniert.\n\nBereit für Blutdruck, Medikamente und Verlauf.");
        text.setTextSize(20);
        text.setTextColor(Color.rgb(7, 21, 47));
        text.setGravity(Gravity.CENTER);
        text.setLineSpacing(dp(2), 1.05f);
        card.addView(text, new LinearLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.WRAP_CONTENT
        ));

        TextView badge = new TextView(this);
        badge.setText("APK-Test OK");
        badge.setTextSize(17);
        badge.setTextColor(Color.rgb(20, 92, 46));
        badge.setGravity(Gravity.CENTER);
        badge.setPadding(dp(16), dp(9), dp(16), dp(9));

        GradientDrawable badgeBg = new GradientDrawable();
        badgeBg.setColor(Color.rgb(232, 246, 236));
        badgeBg.setCornerRadius(dp(999));
        badge.setBackground(badgeBg);

        LinearLayout.LayoutParams badgeParams = new LinearLayout.LayoutParams(
                ViewGroup.LayoutParams.WRAP_CONTENT,
                ViewGroup.LayoutParams.WRAP_CONTENT
        );
        badgeParams.setMargins(0, dp(20), 0, 0);
        card.addView(badge, badgeParams);

        setContentView(scroll);
    }
}
