
// react icons
import { MdFavorite } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

// local
import styles from "./supplications.module.css";
const supplications = [
    {
      id: 1,
      title: "دعاء الهداية والتقوى",
      text: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى، وَالْعَفَافَ وَالْغِنَى",
      virtue: "من قاله كان من المهتدين المتقين، ورزقه الله الغنى عن الناس",
      time: "الصباح والمساء",
    },
    {
      id: 2,
      title: "الصلاة على النبي",
      text: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ",
      virtue: "من صلى علي صلاة صلى الله عليه بها عشرًا",
      time: "في كل وقت",
    },
    {
      id: 3,
      title: "دعاء التيسير",
      text: "رَبِّ اشْرَحْ لِي صَدْرِي، وَيَسِّرْ لِي أَمْرِي",
      virtue: "يفتح الله به أبواب التيسير والراحة",
      time: "قبل البدء في أمرٍ مهم",
    },
    {
      text: "اللَّهُمَّ اغْفِرْ لِي وَلِوَالِدَيَّ وَارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
      virtue: "دعاء عظيم للوالدين، من البرّ بهما حتى بعد موتهما",
      time: "كل يوم",
    },
    {
      text: "رَبِّ زِدْنِي عِلْمًا",
      virtue: "يستحب قوله لطالب العلم ولمن أراد الفهم والبركة في العلم",
      time: "عند طلب العلم أو بعد الصلاة",
    },
    {
      text: "اللَّهُمَّ اجْعَلْنِي مِنَ التَّوَّابِينَ وَاجْعَلْنِي مِنَ الْمُتَطَهِّرِينَ",
      virtue: "من قاله بعد الوضوء رُفعت له درجات وحُطّت عنه خطاياه",
      time: "بعد الوضوء",
    },
    {
      text: "اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ",
      virtue: "وصية النبي ﷺ لمعاذ، يجمع بين الذكر والشكر والعبادة",
      time: "بعد الصلاة",
    },
    {
      text: "اللَّهُمَّ إنِّي أَعُوذُ بِكَ مِنَ الهَمِّ وَالحَزَنِ، وَأَعُوذُ بِكَ مِنَ العَجْزِ وَالكَسَلِ، وَأَعُوذُ بِكَ مِنَ الجُبْنِ وَالبُخْلِ، وَأَعُوذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ وَقَهْرِ الرِّجَالِ",
      virtue: "من قاله أذهب الله عنه الهم والحزن بإذن الله",
      time: "عند الضيق أو الهم",
    },
    {
      text: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
      virtue: "من جوامع الدعاء، جمع خيري الدنيا والآخرة",
      time: "في الصلاة وبين السجدتين",
    },
    {
      text: "اللَّهُمَّ إنِّي ظَلَمْتُ نَفْسِي ظُلْمًا كَثِيرًا، وَلا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ، فَاغْفِرْ لِي مَغْفِرَةً مِنْ عِنْدِكَ، وَارْحَمْنِي، إِنَّكَ أَنْتَ الغَفُورُ الرَّحِيمُ",
      virtue: "دعاء سيد الاستغفار، من قاله غفر الله له ذنوبه",
      time: "في السجود أو بعد الذنب",
    },
  ]

 function Supplications() {

  // add new value
  function handleAddNew() {
    console.log('Add new clicked');
  };

  // add to favorite
  function handleAddToFavorite () {
    
  };

  // update value
  function handleUpdate(id) {
    
    console.log('Update clicked for id:', id);
  };

  // delete value
  function handleDelete() {
    
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.addButton} onClick={handleAddNew}>
          إضافة دعاء جديد +
        </button>
      </div>

      <div className={styles.cardsGrid}>
        {supplications.map((supplication) => (
          <div key={supplication.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>{supplication.title}</h3>
            </div>

            <div className={styles.cardContent}>
              <div className={styles.section}>
                <div className={styles.sectionTitleContainer}>
                  <h4 className={styles.sectionTitle}> الدعاء</h4>
                </div>
                <p className={styles.sectionText}>{supplication.text}</p>
              </div>

              <div className={styles.section}>
                <div className={styles.sectionTitleContainer}>
                  <h4 className={styles.sectionTitle}>فضله</h4>
                </div>
                <p className={styles.sectionText}>{supplication.virtue}</p>
              </div>

              <div className={styles.section}>
                <div className={styles.sectionTitleContainer}>
                  <h4 className={styles.sectionTitle}>الوقت</h4>
                </div>
                <p className={styles.sectionText}>{supplication.time}</p>
              </div>
            </div>

            <div className={styles.cardActions}>
              <button
                className={`${styles.actionButton} ${styles.favoriteBtn}`}
                onClick={() => handleAddToFavorite(supplication.id)}
              >
                <MdFavoriteBorder/>
              </button>
              <button
                className={`${styles.actionButton} ${styles.updateBtn}`}
                onClick={() => handleUpdate(supplication.id)}
              >
                <CiEdit/>
              </button>
              <button
                className={`${styles.actionButton} ${styles.deleteBtn}`}
                onClick={() => handleDelete(supplication.id)}
              >
                <MdDeleteOutline/>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Supplications;