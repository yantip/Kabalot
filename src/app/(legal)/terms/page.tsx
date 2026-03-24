import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "תנאי שימוש — קבלות",
  description: "תנאי השימוש של שירות קבלות לניהול קבלות חכם",
};

export default function TermsPage() {
  return (
    <article className="prose prose-neutral max-w-none space-y-8 text-foreground">
      <div className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">תנאי שימוש</h1>
        <p className="text-sm text-muted-foreground">עדכון אחרון: מרץ 2026</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">1. כללי</h2>
        <p className="text-sm leading-relaxed text-foreground/85">
          ברוכים הבאים לשירות &quot;קבלות&quot; (להלן: &quot;השירות&quot;, &quot;האפליקציה&quot; או &quot;הפלטפורמה&quot;). השירות מופעל ומנוהל על ידי קבלות (להלן: &quot;החברה&quot;, &quot;אנחנו&quot; או &quot;שלנו&quot;). השימוש בשירות כפוף לתנאי שימוש אלה (להלן: &quot;התנאים&quot;). בעצם הגישה לשירות או השימוש בו, אתה מסכים להיות כפוף לתנאים אלה. אם אינך מסכים לתנאים אלה, אנא הימנע משימוש בשירות.
        </p>
        <p className="text-sm leading-relaxed text-foreground/85">
          אנו שומרים לעצמנו את הזכות לעדכן ולשנות תנאים אלה בכל עת. שינויים מהותיים יפורסמו באפליקציה או יישלחו בדוא&quot;ל. המשך השימוש בשירות לאחר פרסום שינויים מהווה הסכמה לתנאים המעודכנים.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">2. תיאור השירות</h2>
        <p className="text-sm leading-relaxed text-foreground/85">
          קבלות הוא שירות מבוסס ענן לניהול קבלות חכם, המאפשר למשתמשים:
        </p>
        <ul className="list-disc list-inside space-y-2 text-sm text-foreground/85">
          <li>איסוף קבלות באמצעות צילום ושליחה דרך בוט טלגרם</li>
          <li>חילוץ נתונים אוטומטי מתמונות קבלות באמצעות בינה מלאכותית</li>
          <li>ארגון קבלות לפי פרויקטים וקטגוריות</li>
          <li>ייצוא נתונים לפורמטים CSV ו-Excel</li>
          <li>עריכה ואישור של נתוני קבלות שחולצו</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">3. הרשמה וחשבון משתמש</h2>
        <p className="text-sm leading-relaxed text-foreground/85">
          כדי להשתמש בשירות, עליך ליצור חשבון משתמש. בעת ההרשמה, אתה מתחייב:
        </p>
        <ul className="list-disc list-inside space-y-2 text-sm text-foreground/85">
          <li>לספק מידע מדויק, עדכני ומלא</li>
          <li>לשמור על סודיות פרטי הגישה שלך (אימייל וסיסמה)</li>
          <li>להודיע לנו מיד על כל שימוש בלתי מורשה בחשבונך</li>
          <li>להיות בן 18 לפחות או בעל הסכמת הורה/אפוטרופוס</li>
        </ul>
        <p className="text-sm leading-relaxed text-foreground/85">
          אתה אחראי באופן בלעדי לכל הפעילות המתרחשת תחת חשבונך. אנו שומרים לעצמנו את הזכות להשעות או לסגור חשבונות שמפרים תנאים אלה.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">4. תוכניות ותשלומים</h2>
        <p className="text-sm leading-relaxed text-foreground/85">
          השירות מציע מספר תוכניות מנוי:
        </p>
        <ul className="list-disc list-inside space-y-2 text-sm text-foreground/85">
          <li><strong>תוכנית חינמית:</strong> כוללת עד 5 קבלות בחודש ופרויקט אחד, ללא עלות.</li>
          <li><strong>תוכנית מקצועית:</strong> כוללת עד 500 קבלות בחודש, פרויקטים ללא הגבלה ותמיכה בעדיפות, בתשלום חודשי של ₪30.</li>
        </ul>
        <p className="text-sm leading-relaxed text-foreground/85">
          עיבוד התשלומים מתבצע באמצעות ספק התשלומים Lemon Squeezy (להלן: &quot;ספק התשלומים&quot;). בעת ביצוע תשלום, אתה כפוף גם לתנאי השימוש ומדיניות הפרטיות של Lemon Squeezy. פרטי התשלום שלך (כגון מספר כרטיס אשראי) מעובדים ישירות על ידי ספק התשלומים ואינם נשמרים בשרתים שלנו.
        </p>
        <p className="text-sm leading-relaxed text-foreground/85">
          המנוי מתחדש אוטומטית בתום כל תקופת חיוב, אלא אם בוטל על ידך לפני תאריך החידוש. ביטול המנוי ייכנס לתוקף בתום תקופת החיוב הנוכחית.
        </p>
        <p className="text-sm leading-relaxed text-foreground/85">
          אנו שומרים לעצמנו את הזכות לשנות את מחירי התוכניות בכל עת. שינויים במחירים ייכנסו לתוקף בתחילת תקופת החיוב הבאה, ונודיע לך מראש על כל שינוי מהותי.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">5. שימוש מותר</h2>
        <p className="text-sm leading-relaxed text-foreground/85">
          אתה מתחייב להשתמש בשירות אך ורק למטרות חוקיות ובהתאם לתנאים אלה. בפרט, אתה מתחייב שלא:
        </p>
        <ul className="list-disc list-inside space-y-2 text-sm text-foreground/85">
          <li>להעלות תוכן בלתי חוקי, פוגעני, מזיק או מפר זכויות של צד שלישי</li>
          <li>להשתמש בשירות לצרכי הונאה, זיוף או פעילות בלתי חוקית</li>
          <li>לנסות לפרוץ, לשבש או לפגוע במערכות האבטחה של השירות</li>
          <li>להשתמש בבוטים, סקריפטים או אמצעים אוטומטיים אחרים שלא אושרו על ידינו</li>
          <li>להעתיק, לשכפל או להפיץ חלק כלשהו מהשירות ללא אישור בכתב</li>
          <li>להעלות תמונות שאינן קבלות או מסמכים פיננסיים לגיטימיים</li>
          <li>לחרוג ממגבלות השימוש של התוכנית שלך באמצעים טכניים</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">6. קניין רוחני</h2>
        <p className="text-sm leading-relaxed text-foreground/85">
          כל הזכויות, הכותרות והאינטרסים בשירות, לרבות אך לא רק, עיצוב, קוד, טקסט, גרפיקה, לוגואים, סימני מסחר ותוכנה — שייכים לחברה או למעניקי הרישיון שלה ומוגנים על ידי חוקי קניין רוחני.
        </p>
        <p className="text-sm leading-relaxed text-foreground/85">
          אין בתנאים אלה כדי להעניק לך זכות קניין רוחני כלשהי בשירות, למעט רישיון מוגבל, לא בלעדי, לא ניתן להעברה ובר-ביטול לשימוש בשירות בהתאם לתנאים אלה.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">7. תוכן משתמשים</h2>
        <p className="text-sm leading-relaxed text-foreground/85">
          אתה שומר על כל הזכויות בתוכן שאתה מעלה לשירות (תמונות קבלות, נתונים וכו&apos;). בעצם העלאת תוכן, אתה מעניק לנו רישיון מוגבל לשימוש בתוכן אך ורק לצורך אספקת השירות, כולל עיבוד תמונות וחילוץ נתונים.
        </p>
        <p className="text-sm leading-relaxed text-foreground/85">
          אנו לא נשתמש בתוכן שלך למטרות אחרות, לא נמכור אותו ולא נשתף אותו עם צדדים שלישיים, למעט כפי שמתואר במדיניות הפרטיות שלנו.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">8. זמינות השירות</h2>
        <p className="text-sm leading-relaxed text-foreground/85">
          אנו משתדלים לספק שירות רציף ואמין, אך איננו מתחייבים לזמינות של 100%. השירות עלול להיות לא זמין מעת לעת עקב תחזוקה, עדכונים, תקלות טכניות או נסיבות שאינן בשליטתנו.
        </p>
        <p className="text-sm leading-relaxed text-foreground/85">
          אנו שומרים לעצמנו את הזכות לשנות, להשעות או להפסיק את השירות (או חלק ממנו) בכל עת, עם או בלי הודעה מוקדמת.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">9. דיוק הנתונים</h2>
        <p className="text-sm leading-relaxed text-foreground/85">
          חילוץ הנתונים מקבלות מתבצע באמצעות טכנולוגיית בינה מלאכותית. למרות שאנו שואפים לדיוק מרבי, אין אנו מתחייבים לדיוק של 100% בנתונים שחולצו. באחריותך לבדוק ולאשר את הנתונים שחולצו לפני השימוש בהם.
        </p>
        <p className="text-sm leading-relaxed text-foreground/85">
          השירות אינו מהווה תחליף לייעוץ חשבונאי, מיסויי או משפטי מקצועי. אין להסתמך על נתוני השירות כבסיס יחיד לדיווח כספי או מיסויי.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">10. הגבלת אחריות</h2>
        <p className="text-sm leading-relaxed text-foreground/85">
          השירות מסופק &quot;כמות שהוא&quot; (AS IS) ו-&quot;כפי שזמין&quot; (AS AVAILABLE), ללא אחריות מכל סוג שהוא, מפורשת או משתמעת, לרבות אך לא רק אחריות לסחירות, התאמה למטרה מסוימת ואי-הפרה.
        </p>
        <p className="text-sm leading-relaxed text-foreground/85">
          בשום מקרה לא נהיה אחראים לנזקים עקיפים, מיוחדים, תוצאתיים או עונשיים, לרבות אובדן רווחים, אובדן נתונים, הפסקת עסקים או כל נזק אחר, גם אם הודענו על האפשרות לנזקים כאלה. אחריותנו הכוללת לא תעלה על הסכום ששילמת לנו ב-12 החודשים שקדמו לאירוע.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">11. שיפוי</h2>
        <p className="text-sm leading-relaxed text-foreground/85">
          אתה מסכים לשפות ולפצות את החברה, מנהליה, עובדיה ושלוחיה מפני כל תביעה, נזק, הפסד, אחריות והוצאה (כולל שכר טרחת עורכי דין) הנובעים מהפרת תנאים אלה על ידך או משימוש בלתי מורשה בשירות.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">12. סיום</h2>
        <p className="text-sm leading-relaxed text-foreground/85">
          אתה רשאי לבטל את חשבונך בכל עת. אנו שומרים לעצמנו את הזכות להשעות או לסגור את חשבונך אם נמצא שהפרת תנאים אלה. בעת סגירת חשבון:
        </p>
        <ul className="list-disc list-inside space-y-2 text-sm text-foreground/85">
          <li>הגישה שלך לשירות תיפסק מיידית</li>
          <li>נתוניך יימחקו תוך 30 ימים מיום הסגירה, אלא אם כן נדרש שמירה על פי חוק</li>
          <li>תשלומים שכבר בוצעו לא יוחזרו (ראה מדיניות החזרים)</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">13. דין חל וסמכות שיפוט</h2>
        <p className="text-sm leading-relaxed text-foreground/85">
          תנאים אלה יפורשו בהתאם לדיני מדינת ישראל. כל סכסוך הנובע מתנאים אלה או השימוש בשירות יידון בבתי המשפט המוסמכים במחוז תל אביב-יפו.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">14. שונות</h2>
        <ul className="list-disc list-inside space-y-2 text-sm text-foreground/85">
          <li>אם סעיף כלשהו בתנאים אלה ייקבע כבלתי תקף או בלתי ניתן לאכיפה, שאר הסעיפים ימשיכו לעמוד בתוקפם.</li>
          <li>אי אכיפה של זכות כלשהי על ידינו אינה מהווה ויתור על אותה זכות.</li>
          <li>תנאים אלה מהווים את ההסכם המלא בינך לבין החברה בנוגע לשימוש בשירות ומחליפים כל הסכם קודם.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">15. יצירת קשר</h2>
        <p className="text-sm leading-relaxed text-foreground/85">
          לכל שאלה בנוגע לתנאי שימוש אלה, ניתן לפנות אלינו:
        </p>
        <ul className="list-none space-y-1 text-sm text-foreground/85">
          <li>דוא&quot;ל: <a href="mailto:support@kabalot.app" className="text-primary hover:underline">support@kabalot.app</a></li>
          <li>דוא&quot;ל לנושאים משפטיים: <a href="mailto:legal@kabalot.app" className="text-primary hover:underline">legal@kabalot.app</a></li>
        </ul>
      </section>
    </article>
  );
}
