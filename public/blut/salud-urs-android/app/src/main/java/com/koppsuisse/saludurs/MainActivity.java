package com.koppsuisse.saludurs;

import android.app.*;import android.os.*;import android.content.*;import android.graphics.Color;import android.view.*;import android.widget.*;import java.text.*;import java.util.*;

public class MainActivity extends Activity{
  LinearLayout list; EditText sys,dia,pulse,temp,spo2,gluc,meds,notes; SharedPreferences sp;
  int pad=18;
  public void onCreate(Bundle b){super.onCreate(b); sp=getSharedPreferences("data",0);
    ScrollView sv=new ScrollView(this); LinearLayout root=new LinearLayout(this); root.setOrientation(LinearLayout.VERTICAL); root.setPadding(24,24,24,24); sv.addView(root);
    TextView title=t("Salud Urs",28,true); title.setTextColor(Color.rgb(21,101,192)); root.addView(title);
    root.addView(t("Blutdruck, Puls, Temperatur, Sauerstoff, Blutzucker und Medikamente lokal speichern.",15,false));
    sys=e("SYS oberer Blutdruck, z.B. 150"); dia=e("DIA unterer Blutdruck, z.B. 96"); pulse=e("Puls, z.B. 80"); temp=e("Temperatur, z.B. 36.7"); spo2=e("Sauerstoff %, z.B. 96"); gluc=e("Blutzucker mg/dl, z.B. 98"); meds=e("Medikamente, z.B. Valaxam-D 07:00"); notes=e("Notizen, Symptome, Alkohol, Essen");
    for(EditText x:new EditText[]{sys,dia,pulse,temp,spo2,gluc,meds,notes}) root.addView(x);
    Button save=new Button(this); save.setText("Messung speichern"); root.addView(save); save.setOnClickListener(v->save());
    Button clear=new Button(this); clear.setText("Alles löschen"); root.addView(clear); clear.setOnClickListener(v->{sp.edit().clear().apply(); render();});
    root.addView(t("Verlauf",22,true)); list=new LinearLayout(this); list.setOrientation(LinearLayout.VERTICAL); root.addView(list); setContentView(sv); render();}
  TextView t(String s,int size,boolean bold){TextView v=new TextView(this); v.setText(s); v.setTextSize(size); v.setPadding(0,10,0,10); if(bold)v.setTypeface(null,1); return v;}
  EditText e(String hint){EditText x=new EditText(this); x.setHint(hint); x.setTextSize(16); x.setSingleLine(false); x.setPadding(0,pad,0,pad); return x;}
  void save(){String dt=new SimpleDateFormat("yyyy-MM-dd HH:mm",Locale.getDefault()).format(new Date()); String rec=dt+" | BP "+sys.getText()+"/"+dia.getText()+" | Puls "+pulse.getText()+" | Temp "+temp.getText()+" | SpO2 "+spo2.getText()+" | Glucose "+gluc.getText()+" | Meds: "+meds.getText()+" | Notiz: "+notes.getText(); String old=sp.getString("records",""); sp.edit().putString("records",rec+"\n\n"+old).apply(); for(EditText x:new EditText[]{sys,dia,pulse,temp,spo2,gluc,meds,notes})x.setText(""); render(); Toast.makeText(this,"Gespeichert",Toast.LENGTH_SHORT).show();}
  void render(){list.removeAllViews(); String data=sp.getString("records",""); if(data.trim().isEmpty()){list.addView(t("Noch keine Messungen.",16,false));return;} for(String r:data.split("\\n\\n")){TextView v=t(r,15,false); v.setBackgroundColor(Color.rgb(245,245,245)); v.setPadding(16,16,16,16); LinearLayout.LayoutParams lp=new LinearLayout.LayoutParams(-1,-2); lp.setMargins(0,8,0,8); list.addView(v,lp);}}
}
