// local
import styles from "./about.module.css";

const features = [
  {
    id: 1,
    title: "رتب ادعيتك في مكان واحد",
    desc: "رتب كل ادعيتك المفضله التي تدوام كل يوم عليها في مكان واحد فقط لتذكرها وعدم ضياعها في مئات الصفحات",
    icon: "📚",
  },
  {
    id: 2,
    title: "قائمة المفضلة",
    desc: "احفظ أدعيتك المفضلة للوصول السريع والتنظيم الشخصي.",
    icon: "⭐",
  },
  {
    id: 3,
    title: "السبحه الالكترنية",
    desc: "عداد بسيط وجميل للتسبيح مع تأثيرات تفاعلية وحفظ التقدم.",
    icon: "🔔",
  },
  {
    id: 4,
    title: "تجربة محلية وسريعة",
    desc: "واجهة سريعة وسهلة الاستخدام تعمل دون إنترنت بعد التحميل الأول.",
    icon: "⚡",
  },
];

export default function About() {
  return (
    <main className={styles.page} dir="rtl">
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <h1 className={styles.title}>عن تطبيق زكري</h1>
          <p className={styles.subtitle}>
            رفيقك اليومي في حفظ الأذكار وإدارة الأدعية بطريقة جميلة وسهلة
          </p>
        </div>
      </section>

      <section className={styles.features}>
        <h2 className={styles.featuresTitle}>مميزات التطبيق</h2>
        <div className={styles.grid}>
          {features.map((f) => (
            <article key={f.id} className={styles.card}>
              <div className={styles.iconContainer}>
                <div className={styles.icon} aria-hidden>
                  {f.icon}
                </div>
              </div>
              <h3 className={styles.cardTitle}>{f.title}</h3>
              <p className={styles.cardDesc}>{f.desc}</p>
              <div className={styles.cardGlow} />
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
