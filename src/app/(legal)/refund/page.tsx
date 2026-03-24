import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "מדיניות החזרים — קבלות",
  description: "מדיניות ההחזרים והביטולים של שירות קבלות לניהול קבלות חכם",
};

export default function RefundPage() {
  return (
    <article className="prose prose-neutral max-w-none space-y-8 text-foreground">
      <div className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">מדיניות החזרים וביטולים</h1>
        <p className="text-sm text-muted-foreground">עדכון אחרון: מרץ 2026</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">1. מבוא</h2>
        <p className="text-sm leading-relaxed text-foreground/85">
          מדיניות החזרים וביטולים זו (להלן: &quot;מדיניות ההחזרים&quot;) מתארת את הזכויות וההליכים הנוגעים לביטולי מנוי והחזרים כספיים בשירות &quot;קבלות&quot; (להלן: &quot;השירות&quot;), המופעל על ידי קבלות (להלן: &quot;החברה&quot;). מדיניות זו חלה על כל התשלומים המבוצעים דרך ספק התשלומים Lemon Squeezy.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">2. תקופת ניסיון והתוכנית החינמית</h2>
        <p className="text-sm leading-relaxed text-foreground/85">
          השירות מציע תוכנית חינמית המאפשרת שימוש מוגבל (עד 5 קבלות בחודש, עד 3 פרויקטים) ללא כל עלות וללא הגבלת זמן. אנו ממליצים לנצל את התוכנית החינמית כדי להכיר את השירות לפני שדרוג לתוכנית בתשלום.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">3. ביטול מנוי</h2>
        <p className="text-sm leading-relaxed text-foreground/85">
          באפשרותך לבטל את המנוי שלך בכל עת דרך עמוד הגדרות החיוב באפליקציה. בעת ביטול מנוי:
        </p>
        <ul className="list-disc list-inside space-y-2 text-sm text-foreground/85">
          <li>הביטול ייכנס לתוקף בתום תקופת החיוב הנוכחית</li>
          <li>תמשיך ליהנות מתכונות התוכנית המקצועית עד סוף התקופה ששולמה</li>
          <li>לאחר תום התקופה, חשבונך ישודרג אוטומטית חזרה לתוכנית החינמית</li>
          <li>לא יבוצע חיוב נוסף לאחר הביטול</li>
          <li>הנתונים שלך יישמרו ולא יימחקו עקב שינוי תוכנית</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">4. זכאות להחזר כספי</h2>
        <p className="text-sm leading-relaxed text-foreground/85">
          אנו מעוניינים בשביעות רצונך המלאה. להלן פירוט מדיניות ההחזרים:
        </p>

        <h3 className="text-lg font-semibold text-foreground">4.1 החזר מלא (תוך 14 ימים)</h3>
        <p className="text-sm leading-relaxed text-foreground/85">
          בהתאם לחוק הגנת הצרכן, התשמ&quot;א-1981, הנך זכאי לבטל את העסקה ולקבל החזר כספי מלא תוך 14 ימים מיום ביצוע התשלום הראשון, בתנאי שלא נעשה שימוש מהותי בשירות (עיבוד של יותר מ-10 קבלות). ההחזר יבוצע באמצעי התשלום המקורי תוך 14 ימי עסקים.
        </p>

        <h3 className="text-lg font-semibold text-foreground">4.2 החזר חלקי (לאחר 14 ימים)</h3>
        <p className="text-sm leading-relaxed text-foreground/85">
          לאחר תקופת ה-14 ימים, לא יינתנו החזרים באופן אוטומטי. עם זאת, ניתן לפנות אלינו במקרים הבאים ונבחן כל בקשה בנפרד:
        </p>
        <ul className="list-disc list-inside space-y-2 text-sm text-foreground/85">
          <li>תקלה טכנית מתמשכת שמנעה ממך שימוש בשירות</li>
          <li>חיוב כפול או שגוי</li>
          <li>השירות לא תאם את התיאור שפורסם</li>
        </ul>

        <h3 className="text-lg font-semibold text-foreground">4.3 מקרים שאינם זכאים להחזר</h3>
        <ul className="list-disc list-inside space-y-2 text-sm text-foreground/85">
          <li>שינוי דעה לאחר תקופת ה-14 ימים</li>
          <li>אי-שימוש בשירות (ללא ביטול מראש)</li>
          <li>הפרה של תנאי השימוש שהובילה להשעיית החשבון</li>
          <li>חוסר שביעות רצון מדיוק חילוץ הנתונים (שכן השירות כולל אפשרות לעריכה ידנית)</li>
          <li>תקופות חיוב שכבר נוצלו במלואן</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">5. הליך בקשת החזר</h2>
        <p className="text-sm leading-relaxed text-foreground/85">
          לבקשת החזר כספי, יש לפנות אלינו באחת הדרכים הבאות:
        </p>
        <ul className="list-disc list-inside space-y-2 text-sm text-foreground/85">
          <li>שליחת דוא&quot;ל לכתובת <a href="mailto:billing@kabalot.app" className="text-primary hover:underline">billing@kabalot.app</a></li>
          <li>שליחת דוא&quot;ל לכתובת <a href="mailto:support@kabalot.app" className="text-primary hover:underline">support@kabalot.app</a> עם הנושא &quot;בקשת החזר&quot;</li>
        </ul>
        <p className="text-sm leading-relaxed text-foreground/85">
          בבקשה כלול את הפרטים הבאים:
        </p>
        <ul className="list-disc list-inside space-y-2 text-sm text-foreground/85">
          <li>כתובת הדוא&quot;ל של החשבון</li>
          <li>תאריך התשלום</li>
          <li>סיבת הבקשה להחזר</li>
          <li>כל מידע נוסף שעשוי לסייע בטיפול בבקשה</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">6. זמני טיפול</h2>
        <ul className="list-disc list-inside space-y-2 text-sm text-foreground/85">
          <li><strong>אישור/דחיית בקשה:</strong> תוך 5 ימי עסקים מקבלת הבקשה</li>
          <li><strong>ביצוע ההחזר:</strong> תוך 14 ימי עסקים מאישור הבקשה</li>
          <li><strong>הופעה בחשבון:</strong> ההחזר עשוי להופיע בחשבונך תוך 5-10 ימי עסקים נוספים, בהתאם למדיניות הבנק או חברת האשראי שלך</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">7. אמצעי ההחזר</h2>
        <p className="text-sm leading-relaxed text-foreground/85">
          החזרים יבוצעו באמצעי התשלום המקורי בו בוצעה העסקה. אם אמצעי התשלום המקורי אינו זמין (למשל, כרטיס אשראי שפג תוקפו), נעשה מאמץ למצוא פתרון חלופי בתיאום עם ספק התשלומים Lemon Squeezy.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">8. שינויי מחיר</h2>
        <p className="text-sm leading-relaxed text-foreground/85">
          במקרה של העלאת מחירים:
        </p>
        <ul className="list-disc list-inside space-y-2 text-sm text-foreground/85">
          <li>תקבל הודעה מוקדמת של לפחות 30 ימים לפני כניסת המחיר החדש לתוקף</li>
          <li>המחיר הקיים יישמר עד סוף תקופת החיוב הנוכחית</li>
          <li>תוכל לבטל את המנוי לפני כניסת המחיר החדש לתוקף ולקבל החזר יחסי על התקופה שנותרה</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">9. ביטולים עקב כוח עליון</h2>
        <p className="text-sm leading-relaxed text-foreground/85">
          במקרה של הפסקת השירות באופן קבוע עקב נסיבות שאינן בשליטתנו (כוח עליון), נעשה מאמץ סביר להחזיר לך את החלק היחסי של התשלום עבור התקופה שלא נוצלה.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">10. חיובים שגויים (Chargebacks)</h2>
        <p className="text-sm leading-relaxed text-foreground/85">
          אנו ממליצים לפנות אלינו ישירות לפני פתיחת מחלוקת (chargeback) מול חברת האשראי שלך. פנייה ישירה אלינו תאפשר לנו לפתור את הבעיה מהר יותר ולמנוע עמלות מיותרות. פתיחת chargeback ללא פנייה מוקדמת עלולה לגרום להשעיית חשבונך.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">11. זכויות הצרכן</h2>
        <p className="text-sm leading-relaxed text-foreground/85">
          מדיניות זו אינה גורעת מזכויותיך על פי חוק הגנת הצרכן, התשמ&quot;א-1981, חוק כרטיסי חיוב, התשמ&quot;ו-1986, או כל חוק אחר החל על עסקאות צרכניות בישראל. במקרה של סתירה בין מדיניות זו לבין הוראות החוק, הוראות החוק יגברו.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">12. יצירת קשר</h2>
        <p className="text-sm leading-relaxed text-foreground/85">
          לכל שאלה בנוגע להחזרים וביטולים:
        </p>
        <ul className="list-none space-y-1 text-sm text-foreground/85">
          <li>דוא&quot;ל חיוב: <a href="mailto:billing@kabalot.app" className="text-primary hover:underline">billing@kabalot.app</a></li>
          <li>דוא&quot;ל תמיכה: <a href="mailto:support@kabalot.app" className="text-primary hover:underline">support@kabalot.app</a></li>
        </ul>
        <p className="text-sm leading-relaxed text-foreground/85 mt-4">
          אנו מתחייבים לטפל בכל בקשה באופן הוגן, מהיר ושקוף.
        </p>
      </section>
    </article>
  );
}
