
import { Subject, GradeLevel } from './types';

export const CURRICULUM: Record<GradeLevel, Subject[]> = {
  7: [
    {
      id: 'math',
      name: 'Matematik',
      icon: '📐',
      color: 'bg-blue-600',
      units: [
        { id: '7m-u1', name: 'Tam Sayılarla İşlemler', description: 'Toplama, Çıkarma, Çarpma ve Bölme', topics: [{ id: '7m-t1', name: 'Tam Sayılarla Toplama ve Çıkarma' }, { id: '7m-t2', name: 'Tam Sayılarla Çarpma ve Bölme' }, { id: '7m-t3', name: 'Tam Sayıların Kuvvetleri' }, { id: '7m-t4', name: 'Tam Sayı Problemleri' }] },
        { id: '7m-u2', name: 'Rasyonel Sayılar', description: 'Rasyonel Sayıları Tanıma ve Sıralama', topics: [{ id: '7m-t5', name: 'Rasyonel Sayıların Tanımı' }, { id: '7m-t6', name: 'Sayı Doğrusunda Gösterme' }, { id: '7m-t7', name: 'Ondalık Gösterim' }, { id: '7m-t8', name: 'Rasyonel Sayıları Sıralama' }] },
        { id: '7m-u3', name: 'Rasyonel Sayılarla İşlemler', description: 'Dört İşlem ve Çok Adımlı İşlemler', topics: [{ id: '7m-t9', name: 'Toplama ve Çıkarma İşlemleri' }, { id: '7m-t10', name: 'Çarpma ve Bölme İşlemleri' }, { id: '7m-t11', name: 'Çok Adımlı İşlemler' }, { id: '7m-t12', name: 'Rasyonel Sayı Problemleri' }] },
        { id: '7m-u4', name: 'Cebirsel İfadeler', description: 'Değişkenler ve Örüntüler', topics: [{ id: '7m-t13', name: 'Cebirsel İfadelerle Toplama ve Çıkarma' }, { id: '7m-t14', name: 'Bir Doğal Sayı ile Çarpma' }, { id: '7m-t15', name: 'Sayı Örüntüleri' }] },
        { id: '7m-u5', name: 'Eşitlik ve Denklem', description: 'Denklem Kurma ve Çözme', topics: [{ id: '7m-t16', name: 'Eşitliğin Korunumu' }, { id: '7m-t17', name: 'Birinci Dereceden Bir Bilinmeyenli Denklemler' }, { id: '7m-t18', name: 'Denklem Kurma Problemleri' }] },
        { id: '7m-u6', name: 'Oran ve Orantı', description: 'Doğru ve Ters Orantı', topics: [{ id: '7m-t19', name: 'Oran ve Orantı Kavramı' }, { id: '7m-t20', name: 'Doğru Orantı' }, { id: '7m-t21', name: 'Ters Orantı' }, { id: '7m-t22', name: 'Oran Orantı Problemleri' }] },
        { id: '7m-u7', name: 'Yüzdeler', description: 'Yüzde Hesaplamaları', topics: [{ id: '7m-t23', name: 'Bir Çokluğun Belirtilen Yüzdesini Bulma' }, { id: '7m-t24', name: 'Yüzde ile Artırma ve Azaltma' }, { id: '7m-t25', name: 'Yüzde Problemleri' }] },
        { id: '7m-u8', name: 'Doğrular ve Açılar', description: 'Açı Çeşitleri ve Paralel Doğrular', topics: [{ id: '7m-t26', name: 'Açıortay' }, { id: '7m-t27', name: 'İki Paralel Doğru ve Bir Kesenin Oluşturduğu Açılar' }] },
        { id: '7m-u9', name: 'Çokgenler', description: 'Düzgün Çokgenler ve Alan', topics: [{ id: '7m-t28', name: 'Düzgün Çokgenler' }, { id: '7m-t29', name: 'Çokgenlerde Açılar' }, { id: '7m-t30', name: 'Eşkenar Dörtgen ve Yamuğun Alanı' }, { id: '7m-t31', name: 'Alan Problemleri' }] },
        { id: '7m-u10', name: 'Çember ve Daire', description: 'Çevre ve Alan Hesapları', topics: [{ id: '7m-t32', name: 'Çemberde Açılar' }, { id: '7m-t33', name: 'Çember ve Yay Uzunluğu' }, { id: '7m-t34', name: 'Dairenin Alanı' }] },
        { id: '7m-u11', name: 'Veri İşleme', description: 'Grafik Türleri ve Ortalama', topics: [{ id: '7m-t35', name: 'Çizgi Grafiği' }, { id: '7m-t36', name: 'Aritmetik Ortalama, Tepe Değer ve Ortanca' }, { id: '7m-t37', name: 'Daire Grafiği' }] },
        { id: '7m-u12', name: 'Cisimlerin Görünümü', description: 'Üç Boyutlu Çizimler', topics: [{ id: '7m-t38', name: 'Cisimlerin Farklı Yönlerden Görünümleri' }] }
      ]
    },
    {
      id: 'science',
      name: 'Fen Bilimleri',
      icon: '🧬',
      color: 'bg-green-600',
      units: [
        { id: '7s-u1', name: 'Ünite 1: Güneş Sistemi ve Ötesi', description: 'Uzay Araştırmaları ve Gök Cisimleri', topics: [{ id: '7s-t1', name: 'Uzay Araştırmaları' }, { id: '7s-t2', name: 'Güneş Sistemi Ötesi: Gök Cisimleri' }] },
        { id: '7s-u2', name: 'Ünite 2: Hücre ve Bölünmeler', description: 'Hücre, Mitoz ve Mayoz', topics: [{ id: '7s-t3', name: 'Hücre' }, { id: '7s-t4', name: 'Mitoz' }, { id: '7s-t5', name: 'Mayoz' }] },
        { id: '7s-u3', name: 'Ünite 3: Kuvvet ve Enerji', description: 'İş, Enerji ve Kütle İlişkisi', topics: [{ id: '7s-t6', name: 'Kütle ve Ağırlık İlişkisi' }, { id: '7s-t7', name: 'Kuvvet, İş ve Enerji İlişkisi' }, { id: '7s-t8', name: 'Enerji Dönüşümleri' }] },
        { id: '7s-u4', name: 'Ünite 4: Saf Madde ve Karışımlar', description: 'Atomun Yapısı ve Karışımlar', topics: [{ id: '7s-t9', name: 'Maddenin Tanecikli Yapısı' }, { id: '7s-t10', name: 'Saf Maddeler' }, { id: '7s-t11', name: 'Karışımlar' }, { id: '7s-t12', name: 'Karışımların Ayrılması' }, { id: '7s-t13', name: 'Evsel Atıklar ve Geri Dönüşüm' }] },
        { id: '7s-u5', name: 'Ünite 5: Işığın Madde ile Etkileşimi', description: 'Soğurulma, Aynalar ve Mercekler', topics: [{ id: '7s-t14', name: 'Işığın Soğurulması' }, { id: '7s-t15', name: 'Aynalar' }, { id: '7s-t16', name: 'Işığın Kırılması ve Mercekler' }] },
        { id: '7s-u6', name: 'Ünite 6: Canlılarda Üreme, Büyüme', description: 'İnsan, Bitki ve Hayvanlarda Üreme', topics: [{ id: '7s-t17', name: 'İnsanda Üreme, Büyüme ve Gelişme' }, { id: '7s-t18', name: 'Bitki ve Hayvanlarda Üreme, Büyüme ve Gelişme' }] },
        { id: '7s-u7', name: 'Ünite 7: Elektrik Devreleri', description: 'Ampullerin Bağlanma Şekilleri', topics: [{ id: '7s-t19', name: 'Ampullerin Bağlanma Şekilleri (Seri-Paralel)' }] }
      ]
    },
    {
      id: 'turkish',
      name: 'Türkçe',
      icon: '📚',
      color: 'bg-red-600',
      units: [
        { id: '7tr-u1', name: 'Sözcükte Anlam', description: 'Anlam İlişkileri', topics: [{ id: '7tr-t1', name: 'Gerçek, Mecaz, Terim Anlam' }, { id: '7tr-t2', name: 'Deyim ve Atasözleri' }] },
        { id: '7tr-u2', name: 'Cümlede Anlam', description: 'Cümle Yorumu', topics: [{ id: '7tr-t3', name: 'Öznel ve Nesnel Yargılar' }, { id: '7tr-t4', name: 'Sebep, Amaç, Koşul Cümleleri' }] },
        { id: '7tr-u3', name: 'Fiiller', description: 'Fiil Kipleri ve Zarflar', topics: [{ id: '7tr-t5', name: 'Fiillerde Anlam ve Kipler' }, { id: '7tr-t6', name: 'Ek Fiil' }, { id: '7tr-t7', name: 'Zarflar' }] }
      ]
    },
    {
      id: 'social',
      name: 'Sosyal Bilgiler',
      icon: '🌍',
      color: 'bg-orange-600',
      units: [
        {
          id: '7so-u1',
          name: '1. Ünite: İletişim ve İnsan İlişkileri',
          description: 'Etkili iletişim ve medyanın etkileri.',
          topics: [
            { id: '7so-t1', name: 'İletişim Kurarak Anlaşırız' },
            { id: '7so-t2', name: 'Olumlu İletişim, Mutlu Birey ve Toplum' },
            { id: '7so-t3', name: 'Medyanın Hayatımızdaki Yeri' },
            { id: '7so-t4', name: 'Özgürüm, Sorumluluklarımın Olduğu Yere Kadar' }
          ]
        },
        {
          id: '7so-u2',
          name: '2. Ünite: Türk Tarihinde Yolculuk',
          description: 'Osmanlı Devleti ve Avrupa gelişmeleri.',
          topics: [
            { id: '7so-t5', name: 'Osmanlı Devleti’nin Kuruluşu' },
            { id: '7so-t6', name: 'Osmanlı Devleti’nin Fetih Siyaseti' },
            { id: '7so-t7', name: 'Avrupa’daki Gelişmeler ve Osmanlı Devleti’ne Etkileri' },
            { id: '7so-t8', name: 'Osmanlı Devleti’nde Islahat Hareketleri' },
            { id: '7so-t9', name: 'Seyyahların Gözüyle Osmanlı' }
          ]
        },
        {
          id: '7so-u3',
          name: '3. Ünite: Ülkemizde Nüfus',
          description: 'Nüfus dağılışı, göç ve yerleşme özgürlüğü.',
          topics: [
            { id: '7so-t10', name: 'Yeryüzünde Yaşam' },
            { id: '7so-t11', name: 'Nüfusumuz' },
            { id: '7so-t12', name: 'Nedenleriyle ve Sonuçlarıyla Göç' },
            { id: '7so-t13', name: 'Yerleşme ve Seyahat Özgürlüğü' }
          ]
        },
        {
          id: '7so-u4',
          name: '4. Ünite: Zaman İçinde Bilim',
          description: 'Bilimin tarihsel serüveni ve Türk-İslam bilginleri.',
          topics: [
            { id: '7so-t14', name: 'Geçmişten Günümüze Bilginin Serüveni' },
            { id: '7so-t15', name: 'Türk-İslam Medeniyetinde Bilginler' },
            { id: '7so-t16', name: 'Avrupa’daki Bilimsel Gelişmeler' },
            { id: '7so-t17', name: 'Özgür Düşüncenin Bilimsel Gelişmelere Katkısı' }
          ]
        },
        {
          id: '7so-u5',
          name: '5. Ünite: Ekonomi ve Sosyal Hayat',
          description: 'Üretim, vakıflar ve meslekler.',
          topics: [
            { id: '7so-t18', name: 'Toprak Ana' },
            { id: '7so-t19', name: 'Geçmişten Günümüze Üretim Araçları' },
            { id: '7so-t20', name: 'Sosyal Hayatta Vakıfların Yeri' },
            { id: '7so-t21', name: 'Meslek Edindiren Kurumlar' },
            { id: '7so-t22', name: 'Yeni Meslekler' },
            { id: '7so-t23', name: 'Dijital Dünya' }
          ]
        },
        {
          id: '7so-u6',
          name: '6. Ünite: Yaşayan Demokrasi',
          description: 'Demokrasinin tarihçesi ve anayasal haklar.',
          topics: [
            { id: '7so-t24', name: 'Demokrasinin Serüveni' },
            { id: '7so-t25', name: 'Atatürk ve Demokrasi' },
            { id: '7so-t26', name: 'Anayasa’dan Gelen Güç' },
            { id: '7so-t27', name: 'Daha Fazla Demokrasi' }
          ]
        },
        {
          id: '7so-u7',
          name: '7. Ünite: Ülkeler Arası Köprüler',
          description: 'Uluslararası ilişkiler ve küresel sorunlar.',
          topics: [
            { id: '7so-t28', name: 'Yurtta Barış, Dünyada Barış' },
            { id: '7so-t29', name: 'Biz De Varız' },
            { id: '7so-t30', name: 'Biz Konuksever Bir Milletiz' },
            { id: '7so-t31', name: 'Dünyayı Biz Kurtaracağız' }
          ]
        }
      ]
    },
    {
      id: 'religion',
      name: 'Din Kültürü',
      icon: '🌙',
      color: 'bg-teal-600',
      units: [
        {
          id: '7d-u1',
          name: '1. Ünite: Melek ve Ahiret İnancı',
          description: 'Gayb alemi, melekler ve ahiret hayatı.',
          topics: [
            { id: '7d-t1', name: 'Görülen ve Görülemeyen Varlıklar' },
            { id: '7d-t2', name: 'Melekler ve Özellikleri' },
            { id: '7d-t3', name: 'Dünya ve Ahiret Hayatı' },
            { id: '7d-t4', name: 'Ahiret Hayatının Aşamaları' },
            { id: '7d-t5', name: 'Bir Peygamber Tanıyorum: Hz. İsa (a.s.)' },
            { id: '7d-t6', name: 'Bir Sure Tanıyorum: Nâs Suresi' }
          ]
        },
        {
          id: '7d-u2',
          name: '2. Ünite: Hac ve Kurban',
          description: 'Hac ve Kurban ibadetlerinin esasları.',
          topics: [
            { id: '7d-t7', name: 'İslam’da Hac İbadeti ve Önemi' },
            { id: '7d-t8', name: 'Haccın Yapılışı' },
            { id: '7d-t9', name: 'Umre ve Önemi' },
            { id: '7d-t10', name: 'Kurban İbadeti ve Önemi' },
            { id: '7d-t11', name: 'Bir Peygamber Tanıyorum: Hz. İsmail (a.s.)' },
            { id: '7d-t12', name: 'Bir Ayet Tanıyorum: En’âm Suresi 162. Ayet' }
          ]
        },
        {
          id: '7d-u3',
          name: '3. Ünite: Ahlaki Davranışlar',
          description: 'Güzel ahlak, dürüstlük ve adalet.',
          topics: [
            { id: '7d-t13', name: 'Güzel Ahlaki Tutum ve Davranışlar' },
            { id: '7d-t14', name: 'Bir Peygamber Tanıyorum: Hz. Salih (a.s.)' },
            { id: '7d-t15', name: 'Bir Sure Tanıyorum: Felak Suresi' }
          ]
        },
        {
          id: '7d-u4',
          name: '4. Ünite: Allah’ın Kulu ve Elçisi Hz. Muhammed (s.a.v.)',
          description: 'Hz. Muhammed’in insani ve peygamberlik yönleri.',
          topics: [
            { id: '7d-t16', name: 'Allah’ın (c.c.) Kulu Hz. Muhammed (s.a.v.)' },
            { id: '7d-t17', name: 'Allah’ın (c.c.) Elçisi Hz. Muhammed (s.a.v.)' },
            { id: '7d-t18', name: 'Bir Sure Tanıyorum: Kâfirûn Suresi' }
          ]
        },
        {
          id: '7d-u5',
          name: '5. Ünite: İslam Düşüncesinde Yorumlar',
          description: 'Fıkhi, itikadi ve tasavvufi yorumlar.',
          topics: [
            { id: '7d-t19', name: 'Din Anlayışındaki Yorum Farklılıklarının Sebepleri' },
            { id: '7d-t20', name: 'İslam Düşüncesinde Yorum Biçimleri' },
            { id: '7d-t21', name: 'İslam Düşüncesinde Tasavvufi Yorumlar' }
          ]
        }
      ]
    },
    {
      id: 'english',
      name: 'İngilizce',
      icon: '💬',
      color: 'bg-purple-600',
      units: [
        {
          id: '7e-u1',
          name: '1. Ünite: Appearance and Personality',
          description: 'Describing people and making comparisons.',
          topics: [
            { id: '7e-t1', name: 'Physical Appearance' },
            { id: '7e-t2', name: 'Personal Traits' },
            { id: '7e-t3', name: 'Comparatives' }
          ]
        },
        {
          id: '7e-u2',
          name: '2. Ünite: Sports',
          description: 'Talking about sports and routines.',
          topics: [
            { id: '7e-t4', name: 'Simple Present Tense' },
            { id: '7e-t5', name: 'Sports Names' },
            { id: '7e-t6', name: 'Sport Equipments' }
          ]
        },
        {
          id: '7e-u3',
          name: '3. Ünite: Biographies',
          description: 'Life stories and past events.',
          topics: [
            { id: '7e-t7', name: 'Simple Past Tense' },
            { id: '7e-t8', name: 'Saying Dates' }
          ]
        },
        {
          id: '7e-u4',
          name: '4. Ünite: Wild Animals',
          description: 'Animals and simple suggestions.',
          topics: [
            { id: '7e-t9', name: 'Names of Wild Animals' },
            { id: '7e-t10', name: 'Suggestions with SHOULD' }
          ]
        },
        {
          id: '7e-u5',
          name: '5. Ünite: Television',
          description: 'TV programs and preferences.',
          topics: [
            { id: '7e-t11', name: 'TV Programs' },
            { id: '7e-t12', name: 'Stating Preferences (PREFER)' }
          ]
        },
        {
          id: '7e-u6',
          name: '6. Ünite: Celebrations',
          description: 'Invitations and quantities.',
          topics: [
            { id: '7e-t13', name: 'Accepting and Refusing' },
            { id: '7e-t14', name: 'Offering and Making Invitations' },
            { id: '7e-t15', name: 'Quantifiers' }
          ]
        },
        {
          id: '7e-u7',
          name: '7. Ünite: Dreams',
          description: 'Future predictions.',
          topics: [
            { id: '7e-t16', name: 'Predictions with WILL' },
            { id: '7e-t17', name: 'Reading Dates' }
          ]
        },
        {
          id: '7e-u8',
          name: '8. Ünite: Public Buildings',
          description: 'Giving reasons and names of buildings.',
          topics: [
            { id: '7e-t18', name: 'Names of Public Buildings' },
            { id: '7e-t19', name: 'Making Simple Suggestions' }
          ]
        },
        {
          id: '7e-u9',
          name: '9. Ünite: Environment',
          description: 'Obligations and environment protection.',
          topics: [
            { id: '7e-t20', name: 'Expressing Obligation' },
            { id: '7e-t21', name: 'Environment Protection' }
          ]
        },
        {
          id: '7e-u10',
          name: '10. Ünite: Planets',
          description: 'Space and superior degrees.',
          topics: [
            { id: '7e-t22', name: 'Planet Names' },
            { id: '7e-t23', name: 'Comparatives & Superlatives' }
          ]
        }
      ]
    }
  ],
  8: [
    {
      id: 'math',
      name: 'Matematik (LGS)',
      icon: '📐',
      color: 'bg-blue-700',
      units: [
        { id: '8m-u1', name: 'Çarpanlar ve Katlar', description: 'LGS Temel Konu', topics: [{ id: '8m-t1', name: 'Asal Çarpanlar' }, { id: '8m-t2', name: 'EBOB ve EKOK' }, { id: '8m-t3', name: 'Aralarında Asallık' }] },
        { id: '8m-u2', name: 'Üslü İfadeler', description: 'Kuvvetler ve Bilimsel Gösterim', topics: [{ id: '8m-t4', name: 'Üslü İfadelerle Temel Kurallar' }, { id: '8m-t5', name: 'Ondalık Çözümleme' }, { id: '8m-t6', name: 'Bilimsel Gösterim' }] },
        { id: '8m-u3', name: 'Kareköklü İfadeler', description: 'Köklü Sayılarda İşlemler', topics: [{ id: '8m-t7', name: 'Tam Kare Sayılar' }, { id: '8m-t8', name: 'Karekökten Çıkarma ve İçeri Alma' }, { id: '8m-t9', name: 'Kareköklü Sayılarla Dört İşlem' }] },
        { id: '8m-u4', name: 'Veri Analizi', description: 'Grafiklerin Birbirine Dönüşümü', topics: [{ id: '8m-t10', name: 'Sütun ve Çizgi Grafiği' }, { id: '8m-t11', name: 'Daire Grafiği' }] },
        { id: '8m-u5', name: 'Basit Olayların Olasılığı', description: 'Olasılık Hesapları', topics: [{ id: '8m-t12', name: 'Olası Durumları Belirleme' }, { id: '8m-t13', name: 'Basit Olayların Olasılığı' }] },
        { id: '8m-u6', name: 'Cebirsel İfadeler ve Özdeşlikler', description: 'Çarpanlara Ayırma', topics: [{ id: '8m-t14', name: 'Cebirsel İfadelerin Çarpımı' }, { id: '8m-t15', name: 'Özdeşlikler' }, { id: '8m-t16', name: 'Çarpanlara Ayırma' }] },
        { id: '8m-u7', name: 'Doğrusal Denklemler', description: 'Koordinat Sistemi ve Eğim', topics: [{ id: '8m-t17', name: 'Birinci Dereceden Denklemler' }, { id: '8m-t18', name: 'Koordinat Sistemi' }, { id: '8m-t19', name: 'Doğrusal İlişkiler' }, { id: '8m-t20', name: 'Doğrunun Eğimi' }] },
        { id: '8m-u8', name: 'Eşitsizlikler', description: 'Birinci Dereceden Eşitsizlikler', topics: [{ id: '8m-t21', name: 'Eşitsizlikleri Sayı Doğrusunda Gösterme' }, { id: '8m-t22', name: 'Eşitsizlik Çözümü' }] },
        { id: '8m-u9', name: 'Üçgenler', description: 'Kenar, Açı ve Teoremler', topics: [{ id: '8m-t23', name: 'Üçgenin Yardımcı Elemanları' }, { id: '8m-t24', name: 'Üçgen Eşitsizliği' }, { id: '8m-t25', name: 'Pisagor Bağıntısı' }] },
        { id: '8m-u10', name: 'Eşlik ve Benzerlik', description: 'Geometrik Şekillerde Benzerlik', topics: [{ id: '8m-t26', name: 'Eşlik ve Benzerlik Kavramı' }, { id: '8m-t27', name: 'Benzerlik Oranı' }] },
        { id: '8m-u11', name: 'Dönüşüm Geometrisi', description: 'Öteleme ve Yansıma', topics: [{ id: '8m-t28', name: 'Öteleme' }, { id: '8m-t29', name: 'Yansıma' }, { id: '8m-t30', name: 'Ardışık Öteleme ve Yansıma' }] },
        { id: '8m-u12', name: 'Geometrik Cisimler', description: 'Prizmalar, Silindir ve Piramit', topics: [{ id: '8m-t31', name: 'Dik Prizmalar' }, { id: '8m-t32', name: 'Dik Dairesel Silindir' }, { id: '8m-t33', name: 'Dik Piramit' }, { id: '8m-t34', name: 'Dik Koni' }] }
      ]
    },
    {
      id: 'science',
      name: 'Fen Bilimleri (LGS)',
      icon: '🧬',
      color: 'bg-green-700',
      units: [
        { id: '8s-u1', name: 'Ünite 1: Mevsimler ve İklim', description: 'Dünya Hareketleri', topics: [{ id: '8s-t1', name: 'Mevsimlerin Oluşumu' }, { id: '8s-t2', name: 'İklim ve Hava Hareketleri' }] },
        { id: '8s-u2', name: 'Ünite 2: DNA ve Genetik Kod', description: 'Kalıtım ve Biyoteknoloji', topics: [{ id: '8s-t3', name: 'DNA\'nın Yapısı' }, { id: '8s-t4', name: 'Kalıtım' }, { id: '8s-t5', name: 'Mutasyon ve Modifikasyon' }, { id: '8s-t6', name: 'Adaptasyon' }, { id: '8s-t7', name: 'Biyoteknoloji' }] },
        { id: '8s-u3', name: 'Ünite 3: Basınç', description: 'Katı, Sıvı ve Gaz Basıncı', topics: [{ id: '8s-t8', name: 'Katı Basıncı' }, { id: '8s-t9', name: 'Sıvı Basıncı' }, { id: '8s-t10', name: 'Gaz Basıncı' }] },
        { id: '8s-u4', name: 'Ünite 4: Madde ve Endüstri', description: 'Periyodik Tablo ve Tepkimeler', topics: [{ id: '8s-t11', name: 'Periyodik Sistem' }, { id: '8s-t12', name: 'Fiziksel ve Kimyasal Değişimler' }, { id: '8s-t13', name: 'Kimyasal Tepkimeler' }, { id: '8s-t14', name: 'Asitler ve Bazlar' }, { id: '8s-t15', name: 'Maddenin Isı ile Etkileşimi' }, { id: '8s-t16', name: 'Türkiye\'de Kimya Endüstrisi' }] },
        { id: '8s-u5', name: 'Ünite 5: Basit Makineler', description: 'Makaralar, Kaldıraçlar, Eğik Düzlem', topics: [{ id: '8s-t17', name: 'Basit Makinelerin Sağladığı Kolaylıklar' }, { id: '8s-t18', name: 'Makaralar' }, { id: '8s-t19', name: 'Kaldıraçlar' }, { id: '8s-t20', name: 'Eğik Düzlem' }, { id: '8s-t21', name: 'Çıkrık ve Diğer Makineler' }] },
        { id: '8s-u6', name: 'Ünite 6: Enerji Dönüşümleri', description: 'Besin Zinciri ve Çevre', topics: [{ id: '8s-t22', name: 'Besin Zinciri ve Enerji Akışı' }, { id: '8s-t23', name: 'Fotosentez' }, { id: '8s-t24', name: 'Solunum' }, { id: '8s-t25', name: 'Madde Döngüleri' }, { id: '8s-t26', name: 'Sürdürülebilir Kalkınma' }] },
        { id: '8s-u7', name: 'Ünite 7: Elektrik Yükleri', description: 'Statik Elektrik ve Enerji', topics: [{ id: '8s-t27', name: 'Elektrik Yükleri ve Elektriklenme' }, { id: '8s-t28', name: 'Elektrik Yüklü Cisimler' }, { id: '8s-t29', name: 'Elektrik Enerjisinin Dönüşümü' }] }
      ]
    },
    {
      id: 'social',
      name: 'İnkılap Tarihi (LGS)',
      icon: '⚔️',
      color: 'bg-orange-700',
      units: [
        { id: '8so-u1', name: 'Bir Kahraman Doğuyor', description: 'M. Kemal Hayatı', topics: [{ id: '8so-t1', name: 'Avrupa\'daki Gelişmeler ve Osmanlı' }, { id: '8so-t2', name: 'M. Kemal Çocukluğu ve Okul Hayatı' }, { id: '8so-t3', name: 'M. Kemal Askerlik Hayatı' }] },
        { id: '8so-u2', name: 'Milli Uyanış', description: 'Kurtuluş Savaşı Yolunda', topics: [{ id: '8so-t4', name: 'I. Dünya Savaşı ve Osmanlı' }, { id: '8so-t5', name: 'Mondros ve İşgaller' }, { id: '8so-t6', name: 'Cemiyetler' }, { id: '8so-t7', name: 'Milli Mücadele Hazırlık' }] }
      ]
    }
  ]
};

export const SUBJECTS = CURRICULUM[7]; 

export const MOCK_USER_STATS = {
  xp: 1250,
  streak: 5,
  level: 7,
  gems: 450,
  hearts: 5,
  dailyXpGoal: 50,
  xpEarnedToday: 20,
  currentGrade: 7 as GradeLevel,
  achievements: [
    { id: 'ach-1', name: 'Hızlı Başlangıç', description: 'İlk dersini tamamladın.', icon: '🚀', unlocked: true },
    { id: 'ach-2', name: 'Seri Katili', description: '3 günlük seri yaptın.', icon: '🔥', unlocked: true },
    { id: 'ach-3', name: 'Gece Kuşu', description: 'Saat 22:00\'den sonra ders çalıştın.', icon: '🦉', unlocked: true },
    { id: 'ach-4', name: 'Matematik Dehası', description: 'Matematikte 10 ders bitir.', icon: '🧮', unlocked: false },
    { id: 'ach-5', name: 'Kitap Kurdu', description: 'Türkçede 5 ünite tamamla.', icon: '🐛', unlocked: false },
  ]
};
