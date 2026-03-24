import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "מדיניות פרטיות — קבלות",
  description: "מדיניות הפרטיות של שירות קבלות לניהול קבלות חכם",
};

export default function PrivacyPage() {
  return (
    <article className="prose prose-neutral max-w-none space-y-8 text-foreground">
      <div className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">מדיניות פרטיות</h1>
        <p className="text-sm text-muted-foreground">עדכון אחרון: מרץ 2026</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">1. מבוא</h2>
        <p className="text-sm leading-relaxed text-foreground/85">
          מדיניות פרטיות זו מתארת כיצד קבלות (להלן: &quot;החברה&quot;, &quot;אנחנו&quot; או &quot;שלנו&quot;) אוספת, משתמשת, מאחסנת ומגנה על המידע האישי שלך בעת השימוש בשירות &quot;קבלות&quot; (להלן: &quot;השירות&quot;). אנו מחויבים להגנה על פרטיותך ולטיפול במידע שלך בהתאם לחוקי הגנת הפרטיות החלים, לרבות חוק הגנת הפרטיות, התשמ&quot;א-1981 ותקנות הגנת הפרטיות (אבטחת מידע), התשע&quot;ז-2017.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">2. מידע שאנו אוספים</h2>

        <h3 className="text-lg font-semibold text-foreground">2.1 מידע שאתה מספק לנו</h3>
        <ul className="list-disc list-inside space-y-2 text-sm text-foreground/85">
          <li><strong>פרטי הרשמה:</strong> שם מלא, כתובת דוא&quot;ל וסיסמה (מוצפנת)</li>
          <li><strong>תמונות קבלות:</strong> תמונות שאתה מעלה דרך בוט הטלגרם או ישירות לשירות</li>
          <li><strong>נתוני קבלות:</strong> מידע שחולץ מקבלות או שהזנת ידנית, כולל שם ספק, סכום, תאריך, מטבע, מע&quot;מ, מספר קבלה, קטגוריה והערות</li>
          <li><strong>פרטי פרויקטים:</strong> שמות ותיאורים של פרויקטים שיצרת</li>
          <li><strong>קטגוריות מותאמות אישית:</strong> קטגוריות שהגדרת לסיווג קבלות</li>
        </ul>

        <h3 className="text-lg font-semibold text-foreground">2.2 מידע שנאסף אוטומטית</h3>
        <ul className="list-disc list-inside space-y-2 text-sm text-foreground/85">
          <li><strong>מידע טכני:</strong> כתובת IP, סוג דפדפן, מערכת הפעלה, מזהה מכשיר ודפי הפניה</li>
          <li><strong>נתוני שימוש:</strong> תאריכי ושעות גישה, פעולות שבוצעו באפליקציה וזמני תגובה</li>
          <li><strong>עוגיות (Cookies):</strong> אנו משתמשים בעוגיות לצורך אימות, זכירת העדפות ושיפור חוויית השימוש</li>
        </ul>

        <h3 className="text-lg font-semibold text-foreground">2.3 מידע מצדדים שלישיים</h3>
        <ul className="list-disc list-inside space-y-2 text-sm text-foreground/85">
          <li><strong>טלגרם:</strong> מזהה צ&apos;אט בטלגרם כאשר אתה מחבר את חשבונך לבוט</li>
          <li><strong>Lemon Squeezy (ספק תשלומים):</strong> מידע על מצב מנוי ותשלומים. פרטי כרטיס אשראי מעובדים ונשמרים ישירות על ידי Lemon Squeezy ואינם מגיעים לשרתים שלנו.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">3. כיצד אנו משתמשים במידע</h2>
        <p className="text-sm leading-relaxed text-foreground/85">
          אנו משתמשים במידע שנאסף למטרות הבאות:
        </p>
        <ul className="list-disc list-inside space-y-2 text-sm text-foreground/85">
          <li><strong>אספקת השירות:</strong> עיבוד תמונות קבלות, חילוץ נתונים, ארגון וייצוא מידע</li>
          <li><strong>אימות וגישה:</strong> ניהול חשבון המשתמש שלך ואבטחתו</li>
          <li><strong>תשלומים:</strong> עיבוד מנויים ותשלומים באמצעות Lemon Squeezy</li>
          <li><strong>תקשורת:</strong> שליחת הודעות שירות, עדכונים וסיוע טכני</li>
          <li><strong>שיפור השירות:</strong> ניתוח דפוסי שימוש לצורך שיפור הפונקציונליות והחוויה</li>
          <li><strong>אבטחה:</strong> זיהוי ומניעת פעילות חשודה, הונאות ושימוש לרעה</li>
          <li><strong>עמידה בדרישות חוק:</strong> קיום חובות משפטיות ורגולטוריות</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">4. עיבוד תמונות ובינה מלאכותית</h2>
        <p className="text-sm leading-relaxed text-foreground/85">
          תמונות הקבלות שאתה מעלה מעובדות באמצעות שירות בינה מלאכותית של צד שלישי (OpenAI) לצורך חילוץ הנתונים. חשוב לציין:
        </p>
        <ul className="list-disc list-inside space-y-2 text-sm text-foreground/85">
          <li>התמונות נשלחות לעיבוד לצורך חילוץ הנתונים בלבד</li>
          <li>איננו משתמשים בתמונות שלך לאימון מודלים או למטרות אחרות</li>
          <li>עיבוד הנתונים כפוף למדיניות הפרטיות של OpenAI</li>
          <li>תמונות הקבלות מאוחסנות באופן מאובטח בשרתי האחסון שלנו</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">5. שיתוף מידע עם צדדים שלישיים</h2>
        <p className="text-sm leading-relaxed text-foreground/85">
          אנו לא מוכרים, סוחרים או משכירים את המידע האישי שלך. אנו עשויים לשתף מידע עם הצדדים הבאים בלבד:
        </p>
        <ul className="list-disc list-inside space-y-2 text-sm text-foreground/85">
          <li><strong>Supabase:</strong> ספק תשתית הענן ובסיס הנתונים שלנו, לצורך אחסון וניהול נתונים</li>
          <li><strong>OpenAI:</strong> לצורך עיבוד תמונות קבלות וחילוץ נתונים</li>
          <li><strong>Lemon Squeezy:</strong> לצורך עיבוד תשלומים וניהול מנויים</li>
          <li><strong>Telegram:</strong> לצורך קבלת תמונות קבלות דרך הבוט</li>
          <li><strong>רשויות חוק:</strong> כאשר נדרש על פי חוק, צו בית משפט או הליך משפטי</li>
        </ul>
        <p className="text-sm leading-relaxed text-foreground/85">
          כל ספקי השירות שלנו כפופים להסכמי עיבוד נתונים המחייבים אותם להגן על המידע שלך ולהשתמש בו אך ורק למטרות שהוגדרו.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">6. אבטחת מידע</h2>
        <p className="text-sm leading-relaxed text-foreground/85">
          אנו נוקטים באמצעי אבטחה סבירים כדי להגן על המידע שלך, לרבות:
        </p>
        <ul className="list-disc list-inside space-y-2 text-sm text-foreground/85">
          <li>הצפנת נתונים בזמן העברה (TLS/SSL) ובמנוחה</li>
          <li>הצפנת סיסמאות באמצעות אלגוריתם חד-כיווני (hashing)</li>
          <li>בקרת גישה מבוססת תפקידים</li>
          <li>ניטור ורישום אירועי אבטחה</li>
          <li>גיבויים סדירים של נתונים</li>
          <li>שימוש בתשתיות ענן מאובטחות עם תקנים מוכרים</li>
        </ul>
        <p className="text-sm leading-relaxed text-foreground/85">
          למרות מאמצינו, אין שיטת אבטחה מושלמת. איננו יכולים להבטיח אבטחה מוחלטת של המידע שלך.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">7. שמירת מידע</h2>
        <p className="text-sm leading-relaxed text-foreground/85">
          אנו שומרים את המידע שלך כל עוד חשבונך פעיל או כנדרש לאספקת השירות. לאחר מחיקת חשבונך:
        </p>
        <ul className="list-disc list-inside space-y-2 text-sm text-foreground/85">
          <li>נתונים אישיים ותמונות קבלות יימחקו תוך 30 ימים</li>
          <li>גיבויים עשויים להישמר עד 90 ימים נוספים</li>
          <li>מידע אגרגטיבי ואנונימי עשוי להישמר לצרכים סטטיסטיים</li>
          <li>מידע הנדרש על פי חוק (כגון רשומות חשבונאיות) יישמר בהתאם לתקופות הנדרשות בחוק</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">8. הזכויות שלך</h2>
        <p className="text-sm leading-relaxed text-foreground/85">
          בהתאם לחוקי הגנת הפרטיות החלים, יש לך את הזכויות הבאות:
        </p>
        <ul className="list-disc list-inside space-y-2 text-sm text-foreground/85">
          <li><strong>זכות גישה:</strong> לבקש עותק של המידע האישי שאנו מחזיקים עליך</li>
          <li><strong>זכות תיקון:</strong> לבקש תיקון מידע שגוי או לא מעודכן</li>
          <li><strong>זכות מחיקה:</strong> לבקש מחיקת המידע האישי שלך</li>
          <li><strong>זכות הגבלה:</strong> לבקש הגבלת עיבוד המידע שלך</li>
          <li><strong>זכות ניוד:</strong> לבקש העברת המידע שלך בפורמט מובנה</li>
          <li><strong>זכות התנגדות:</strong> להתנגד לעיבוד מסוים של המידע שלך</li>
        </ul>
        <p className="text-sm leading-relaxed text-foreground/85">
          למימוש זכויותיך, פנה אלינו בכתובת <a href="mailto:privacy@kabalot.app" className="text-primary hover:underline">privacy@kabalot.app</a>. נענה לבקשתך תוך 30 ימים.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">9. עוגיות (Cookies)</h2>
        <p className="text-sm leading-relaxed text-foreground/85">
          אנו משתמשים בסוגי העוגיות הבאים:
        </p>
        <ul className="list-disc list-inside space-y-2 text-sm text-foreground/85">
          <li><strong>עוגיות הכרחיות:</strong> נחוצות לתפקוד הבסיסי של השירות, כולל אימות וניהול הפעלות (sessions)</li>
          <li><strong>עוגיות פונקציונליות:</strong> זוכרות את ההעדפות שלך ומשפרות את חוויית השימוש</li>
        </ul>
        <p className="text-sm leading-relaxed text-foreground/85">
          אנו לא משתמשים בעוגיות למטרות פרסום או מעקב. באפשרותך לנהל את העדפות העוגיות דרך הגדרות הדפדפן שלך.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">10. העברת מידע בין-לאומית</h2>
        <p className="text-sm leading-relaxed text-foreground/85">
          המידע שלך עשוי להיות מאוחסן ומעובד בשרתים הממוקמים מחוץ לישראל, כולל באמצעות ספקי השירות שלנו (Supabase, OpenAI, Lemon Squeezy). אנו מוודאים כי העברות מידע אלה מתבצעות בהתאם לדרישות החוק ובאמצעות אמצעי הגנה מתאימים.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">11. פרטיות קטינים</h2>
        <p className="text-sm leading-relaxed text-foreground/85">
          השירות אינו מיועד לילדים מתחת לגיל 18. איננו אוספים ביודעין מידע אישי מקטינים. אם נודע לנו שאספנו מידע מקטין, נמחק אותו מיידית. אם אתה מאמין שילד סיפק לנו מידע אישי, אנא צור קשר עמנו.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">12. שינויים במדיניות</h2>
        <p className="text-sm leading-relaxed text-foreground/85">
          אנו עשויים לעדכן מדיניות זו מעת לעת. שינויים מהותיים יפורסמו באפליקציה ו/או יישלחו לכתובת הדוא&quot;ל שלך. תאריך העדכון האחרון יצוין בראש מסמך זה. המשך השימוש בשירות לאחר פרסום שינויים מהווה הסכמה למדיניות המעודכנת.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">13. יצירת קשר</h2>
        <p className="text-sm leading-relaxed text-foreground/85">
          לכל שאלה או בקשה בנוגע למדיניות פרטיות זו או לטיפול במידע שלך, ניתן לפנות אלינו:
        </p>
        <ul className="list-none space-y-1 text-sm text-foreground/85">
          <li>דוא&quot;ל כללי: <a href="mailto:support@kabalot.app" className="text-primary hover:underline">support@kabalot.app</a></li>
          <li>דוא&quot;ל פרטיות: <a href="mailto:privacy@kabalot.app" className="text-primary hover:underline">privacy@kabalot.app</a></li>
          <li>דוא&quot;ל משפטי: <a href="mailto:legal@kabalot.app" className="text-primary hover:underline">legal@kabalot.app</a></li>
        </ul>
      </section>
    </article>
  );
}
