package com.koppsuisse.saludurs;

import android.app.*;import android.os.*;import android.content.*;import android.provider.MediaStore;import android.graphics.Bitmap;import android.view.*;import android.widget.*;import android.text.InputType;import java.text.*;import java.util.*;import org.json.*;
import com.google.mlkit.vision.common.InputImage;import com.google.mlkit.vision.text.Text;import com.google.mlkit.vision.text.TextRecognition;import com.google.mlkit.vision.text.latin.TextRecognizerOptions;

public class MainActivity extends Activity{
    static final int REQ_PHOTO=44; LinearLayout root; EditText sys,dia,pulse; TextView status,history; String lastOcr=""; ArrayList<JSONObject> entries=new ArrayList<>(); SharedPreferences sp;
    public void onCreate(Bundle b){super.onCreate(b); sp=getSharedPreferences("salud_urs",0); load(); build(); render();}
    TextView tv(String s,int spSize,int style){ TextView v=new TextView(this); v.setText(s); v.setTextSize(spSize); v.setTypeface(null,style); v.setPadding(0,12,0,6); return v; }
    EditText input(String hint){ EditText e=new EditText(this); e.setHint(hint); e.setInputType(InputType.TYPE_CLASS_NUMBER); e.setTextSize(20); return e; }
    Button btn(String s){ Button b=new Button(this); b.setText(s); b.setAllCaps(false); return b; }
    void build(){ ScrollView sv=new ScrollView(this); root=new LinearLayout(this); root.setOrientation(LinearLayout.VERTICAL); root.setPadding(36,36,36,36); sv.addView(root); setContentView(sv);
        root.addView(tv("Salud Urs – Blutdruck erfassen",28,1)); root.addView(tv("Foto vom Messgerät aufnehmen, Zahlen prüfen und bestätigen.",16,0));
        Button photo=btn("📷 Foto machen und Werte erkennen"); root.addView(photo); photo.setOnClickListener(v->startActivityForResult(new Intent(MediaStore.ACTION_IMAGE_CAPTURE),REQ_PHOTO));
        status=tv("Noch kein Foto erkannt.",15,0); root.addView(status);
        root.addView(tv("Oberer Wert / SYS",16,1)); sys=input("z. B. 140"); root.addView(sys);
        root.addView(tv("Unterer Wert / DIA",16,1)); dia=input("z. B. 86"); root.addView(dia);
        root.addView(tv("Puls",16,1)); pulse=input("z. B. 83"); root.addView(pulse);
        Button save=btn("✅ Bestätigen und speichern"); root.addView(save); save.setOnClickListener(v->saveEntry());
        Button csv=btn("CSV teilen"); root.addView(csv); csv.setOnClickListener(v->shareCsv());
        Button del=btn("Letzten löschen"); root.addView(del); del.setOnClickListener(v->{ if(entries.size()>0){entries.remove(0); persist(); render();}});
        history=tv("",15,0); root.addView(history); }
    protected void onActivityResult(int r,int c,Intent data){ super.onActivityResult(r,c,data); if(r==REQ_PHOTO && c==RESULT_OK && data!=null){ Bitmap bm=(Bitmap)data.getExtras().get("data"); recognize(bm);} }
    void recognize(Bitmap bm){ status.setText("Erkenne Text…"); InputImage img=InputImage.fromBitmap(bm,0); TextRecognition.getClient(TextRecognizerOptions.DEFAULT_OPTIONS).process(img).addOnSuccessListener(t->{ lastOcr=t.getText(); applyGuess(lastOcr); status.setText("Erkannt. Bitte Werte kontrollieren und bestätigen.\nOCR: "+lastOcr.replace('\n',' '));}).addOnFailureListener(e->status.setText("Erkennung fehlgeschlagen. Werte bitte manuell eintragen.")); }
    void applyGuess(String text){ ArrayList<Integer> nums=new ArrayList<>(); java.util.regex.Matcher m=java.util.regex.Pattern.compile("\\d{2,3}").matcher(text); while(m.find()){ try{ int n=Integer.parseInt(m.group()); if(n>=40&&n<=260) nums.add(n);}catch(Exception ignored){} }
        int s=0,d=0,p=0; for(int n:nums){ if(s==0 && n>=90 && n<=240) s=n; else if(d==0 && n>=50 && n<=160) d=n; else if(p==0 && n>=40 && n<=140) p=n; }
        if(s>0) sys.setText(String.valueOf(s)); if(d>0) dia.setText(String.valueOf(d)); if(p>0) pulse.setText(String.valueOf(p)); }
    void saveEntry(){ try{ int s=Integer.parseInt(sys.getText().toString().trim()); int d=Integer.parseInt(dia.getText().toString().trim()); String p=pulse.getText().toString().trim(); JSONObject o=new JSONObject(); o.put("time",new SimpleDateFormat("yyyy-MM-dd HH:mm",Locale.getDefault()).format(new Date())); o.put("sys",s); o.put("dia",d); o.put("pulse",p); entries.add(0,o); persist(); render(); Toast.makeText(this,"Gespeichert",Toast.LENGTH_SHORT).show(); }catch(Exception e){ Toast.makeText(this,"Bitte SYS und DIA prüfen",Toast.LENGTH_LONG).show();} }
    void render(){ StringBuilder sb=new StringBuilder("\nVerlauf\n"); if(entries.size()==0) sb.append("Noch keine Einträge.\n"); for(JSONObject o:entries){ sb.append(o.optString("time")).append("  ").append(o.optInt("sys")).append("/").append(o.optInt("dia")).append("  Puls ").append(o.optString("pulse","-")).append("\n"); } if(history!=null) history.setText(sb.toString()); }
    void load(){ try{ JSONArray a=new JSONArray(sp.getString("entries","[]")); for(int i=0;i<a.length();i++) entries.add(a.getJSONObject(i)); }catch(Exception ignored){} }
    void persist(){ JSONArray a=new JSONArray(); for(JSONObject o:entries) a.put(o); sp.edit().putString("entries",a.toString()).apply(); }
    void shareCsv(){ StringBuilder sb=new StringBuilder("Zeit,SYS,DIA,Puls\n"); for(JSONObject o:entries) sb.append(o.optString("time")).append(',').append(o.optInt("sys")).append(',').append(o.optInt("dia")).append(',').append(o.optString("pulse","-")).append('\n'); Intent i=new Intent(Intent.ACTION_SEND); i.setType("text/csv"); i.putExtra(Intent.EXTRA_TEXT,sb.toString()); startActivity(Intent.createChooser(i,"CSV teilen")); }
}
