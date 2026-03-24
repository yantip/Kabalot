export const PLANS = {
  free: {
    id: "free" as const,
    name: "חינמי",
    price: 0,
    currency: "ILS",
    starPrice: 0,
    receiptsPerMonth: 5,
    projectsLimit: 3,
    features: [
      "5 קבלות בחודש",
      "עד 3 פרויקטים",
      "חילוץ נתונים אוטומטי",
      "ייצוא CSV",
    ],
  },
  pro: {
    id: "pro" as const,
    name: "מקצועי",
    price: 30,
    currency: "ILS",
    starPrice: 500,
    receiptsPerMonth: 500,
    projectsLimit: Infinity,
    features: [
      "500 קבלות בחודש",
      "פרויקטים ללא הגבלה",
      "חילוץ נתונים אוטומטי",
      "ייצוא CSV",
      "תמיכה בעדיפות",
    ],
  },
} as const;

export type PlanId = keyof typeof PLANS;
export type Plan = (typeof PLANS)[PlanId];
