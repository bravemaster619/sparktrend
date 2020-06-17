import {OrderStatus} from '../../helpers/order'

const ar = {
   // raw string
   "browse": "تصفح",
   "Dashboard": "لوحة التحكم",
   "Overview": "نظرة عامة",
   "My Purchases": "مشترياتي",
   "My Sales": "مبيعاتي",
   "My Products": "منتجاتي",
   "Edit Profile": "تعديل الملف الشخصي",
   "Change Password": "تغير كلمة المرور",
   "Sign Out": "تسجيل خروج",
   "Browse": "تصفح",
   "My Purchase": "مشترياتي",
   "Browse Influencers": "تصفح المؤثرين",
   "Sparktrend for Buyers": "سبارك ترند للمشترين",
   "Targeted Influencers": "المؤثرون المستهدفون",
   "Secure Transaction": "معاملة آمنة",
   "Easy to Use": "سهل الاستخدام",
   "SparkTrend for Influencers": "سبارك ترند للبائعين",
   "SparkTrend will provide the influencer with a clear detailed order requierment to provide a professional service": "اتخاذ جميع إجراءات السلامة لتامين الصفقة بين البائع والمشتري",
   "SparkTrend will guarantee a safe and Secure transaction": "الشفافية في الرسوم المنخفضة",
   "SparkTrend will help influencers find more brands to pay for their posts": "الدفع الآمن",
   "SparkTrend provides an Easy to use dashboard to manage all the sales and Ad process for the influencers": "المكان المناسب للمعلنين لإيجاد المؤثر المناسب للإعلان لديه ",
   "User-friendly dashboard for sellers to easily process and manage sales": "لوحة تحكم سهلة الاستخدام للبائع وإدارة المبيعات بسهولة",
   "Are you ready to take your business to the next level?": "هل انت جاهز لاخذ منتجك الى المستوى القادم؟",
   "Sign Up": "التسجيل",
   "Sitemap": "خارطة الموقع",
   "Home": "الرئيسية",
   "Sign In": "تسجيل الدخول",
   "Seller Guide": "دليل البائع",
   "Buyer Guide": "دليل المشتري",
   "Terms of Service": "شروط الخدمة",
   "Privacy Policy": "سياسة الخصوصية",
   "Useful Links": "روابط مفيدة",
   "Refer a Friend": "احالة صديق",
   "Affiliate": "انضم الينا",
   "Filters": "فلتر",
   "Price": "السعر",
   "Minimum Price": "السعر الأدنى",
   "Maximum Price": "السعر الأقصى",
   "Niche": "التخصص",
   "Humour & Memes": "الميمات و الضحك",
   "Fashion & Style": "الموضة و الأناقة",
   "Fitness & Sports": "اللياقة و الرياضة",
   "Quotes & Texts": "اقتباسات و نصوص",
   "Luxury & Motivation": "الفخامة و المحفزات",
   "Cars & Bikes": "السيارات و الدراجات",
   "Outdoor & Travel": "السياحة و السفر",
   "Food & Nutrition": "الغذاء و التغذية",
   "Pets & Animals": "الحيوانات",
   "Models & Lifestyle": "مودلز و أساليب الحياة",
   "Personal & Talent": "المواهب الشخصية",
   "Music & Singers": "العزف و الغناء",
   "Science & Technology": "العلوم و التكنولوجية",
   "Art": "الفن",
   "Beauty, Cosmetic & Personal Care": "مستحضرات التجميل و العناية الشخصية",
   "Clip & Movie": "مقاطع و افلام",
   "Drink & Beverage": "المشروبات",
   "Games & Play": "الألعاب",
   "Cabin and Wood": "الأكواخ و الطبيعة",
   "Interior Design": "التصميم و الديكور",
   "Categories": "الفئات",
   "Single": "فردي",
   "Multiple": "متعدد",
   "Story": "ستوري",
   "Gender": "الجنس",
   "All": "الكل",
   "Male": "ذكر",
   "Female": "انثى",
   "Country Base": "حسب البلد",
   "Apply Filter": "تفعيل التصفية",
   "Reset Filter": "اعادة التصفية",
   "Search for instagram username here...": "...ابحث عن حساب الانستاقرام هنا...",
   "Related Page": "صفحات متقاربة",
   "Followers": "المتابعين",
   "Success Rate": "درجة النجاح",
   "Starts From": "يبداء من",
   "Shoutout completed: ": "تمت الدعاية بنجاح: ",
   "Category": "نوع الاعلان",
   "What is this?": "اختر نوع الإعلان",
   "Select Categories": "نوع الإعلان",
   "Category Info": "اختر المدة للإعلان",
   "Time": "وقت بدء الإعلان",
   "Select Duration": "زمن الإعلان",
   "Buy Now": "شراء!",
   "Confirm": "التأكيد",
   "Your Post": "دعايتك",
   "Date": "التاريخ",
   "Current Timezone": "المنطقة الزمنية الحالية",
   "You can only order shoutout minimum 48 hours from now": "اقل مدة ممكن لطلبة الاعلان هي ٤٨ ساعة من الان ",
   "Caption": " المقتبس تحت الصورة",
   "Additional Information": "بيانات أخرى",
   "Close": "اغلاق",
   "Order Shoutout": "طلب الإعلان",
   "Age Range": "الفئة العمرية",
   "Location": "البلد",
   "Single post is a simple post of a picture and caption.": "الإعلان الفردي هو عبارة عن صورة واحدة مع الاقتباس أسفل الصورة.",
   "Multiple post is a post of multiple pictures at once and a caption.": "الإعلان المتعدد هو عبارة عن اكثر من صورة في منشورة واحدة مع الاقتباس.",
   "Story post is a post on Instagram story.": "دعاية الستوري هي عبارة عن منشور على ستوري الإنستقرام الخاص بالمعلن.",
   "With Bio URL": "مع رابط الموقع",
   "Bio URL": "رابط الموقع",
   "Swipe up URL": "خاصية رفع الشاشة لفتح الرابط",
   "Status": "حالة الإعلان",
   "This Month Sales": "مبيعات هذا الشهر",
   "Total Sales": "اجمالي المبيعات",
   "upcoming schedule": "المواعيد القادمة",
   "Purchased Shoutouts": "الإعلانات المدفوعة ",
   "Pending Outgoing": "قيد الانتظار",
   "Expired": "منتهية",
   "Failed": "فشل",
   "Rejected": "مرفوض",
   "Completed": "تم الإعلان بنجاح",
   "Sold Shoutouts": "الإعلانات المباعة",
   "Success rate": "معدل النجاح",
   "My Accounts": "حسابي",
   "Add Account": "اضافة حساب جديد",
   "Total Followers": "اجمالي المتابعين",
   "Name": "الاسم",
   "Email": "البريد الالكتروني",
   "Paypal Email": "البريد الإلكتروني الخاص بال paypal",
   "Country": "الدولة",
   "Referral Code": "كود الإحالة ",
   "Referral By": "احالة من",
   "Update Profile": "تحديث الملف الشخصي",
   "Old Password": "كلمة المرور القديمة",
   "New Password": "كلمة المرور الجديدة",
   "Confirm Password": "التأكد من كلمة المرور",
   "Password": "كلمة المرور",
   "Forgot password?": "نسيت كلمة المرور؟",
   "Create new account": "اضافة حساب جديد",
   // new translations
   "Oops!": "عذراً",
   "Looks like there's nothing here...": "يبدو انه لا يوجد شيء هنا...",
   "Start Date": "تاريخ البدء",
   "Duration": "المدة الزمنية",
   "hour(s)": "عدد الساعات",
   "Category Type": "نوع الفئة",
   "Download Attachment(s)": "تحميل المرفقات",
   "Start": "ابداء",
   "Copy text": "نسخ النص",
   "Payment Details": "بيانات الدفع",
   "Payment Method": "طريقة الدفع",
   "Bio Price": "سعر النص",
   "Grand Total": "المبلغ الإجمالي",
   "Check Instagram": "التحقق من الحساب",
   "Please provide your name and profile of your instagram that will help us verifying your instagram account": "الرجاء تزويدنا باسمك واسم الحساب لمساعدتنا في التحقق من حساب الإنستقرام",
   "Instagram Account": "حساب الإنستقرام",
   "Validate Instagram": "تحقق من الحساب",
   "Please add the code below into your Instagram bio and then click validate.": "الرجاء اضافة الرمز الموجود بالأسفل إلى قسم السيرة الذاتية ثم الضغط على تحقق من الحساب",
   "Verify Instagram": "التحقق من الحساب",
   "Back": "العودة",
   "Add Product": "اضافة منتج",
   "Describe Your Page": "قم بوصف صفحتك",
   "Please select niche. Buyers can find your product by niche.": "الرجاء اختيار تخصص الصفحة لكي يستطيع المشتري من اختيار المؤثر حسب التخصص.",
   "finish": "الانتهاء",
   // new
   "Full Name": "الاسم كامل",
   "Paypal E-mail (optional)": "ايميل حساب ال PayPal (اختياري)",
   "Referral Code (optional)": "كود الاحالة (اختياري)",
   "unique validation failed on email": "‎البريد الإلكتروني المدخل لقد تم تسجيله من قبل. ‎فضلًا قم بتجربة بريد إلكتروني اخر.",
   "Please enter an instagram account": "الرجاء ادخال اسم حساب الإنستقرام",
   "Next": "التالي",
   "Start selling shoutouts at Sparktrend": "ابداء بيع الإعلانات عبر سبارك ترند",
   "Start buying shoutouts at Sparktrend": "ابداء في شراء الإعلانات عبر سبارك ترند",
   "Sign up Now!": "سجل الان!",
   "Pay": "ادفع",
   "How it Works": "ما هو سبارك ترند",
   "For Buyers": "للمشترين",
   "For Sellers": "للبائعين",
   "Rating": "التقيم",
   "Niches": "التخصص",
   "Schedule": "الجدول",
   "Username": "اسم المستخدم",
   "PayPal E-mail (optional)": "البريد الالكتروني ل PayPal (اختياري)",
   "Has not completed a shoutout yet.": "لم يكمل أي اعلان بعد",
   "Must be smaller than 20mb.": "يجب ان يكون اصغر من 20MB",
   "Rate": "التقيم",
   "Edit Feedback": "تعديل رأيك بالمنتج ",
   "Are you sure?": "هل أنت متأكد?",
   "Do you really want to order this shoutout?": "هل أنت متاكد من طلب هذا الإعلان؟ ",
   "Processing...": "جاري اتمام العملية",
   "Price Detail": "تفاصيل السعر",
   "Pay With:": "ادفع بأستعمال:",
   "Sorry the page not found": "عذراً لم نجد الصفحة",
   "The link you followed probably broken, or the page has been removed": "الرابط الذي تبعته قد يكون خاطئ، ام قد تكون الصفحة محذوفة ",
   "Select Niche": "اختر التخصص",
   "Single Post": "منشورة واحدة",
   "hours": "الساعات",
   "Single post is simple post of 1 picture and a caption.": "المنشورة الواحدة هي عبارة عن نشر صورة واحدة مع الاقتباس",
   "Multiple Post": "منشورة متعددة",
   "Multiple post is simple post of multiple pictures and a caption.": "المنشورة المتعددة هي عبارة عن نشر عدة صور في منشور واحد مع الاقتباس",
   "Story post is a series of pictures and captions.": "منشورة الستوري هي عبارة عن صور في قصة الحساب اليومي",
   "Insights": "احصائيات الحساب",
   "next": "next",
   "View Feedback": "عرض ردود الفعل",
   "Accept": "القبول",
   "Reject": "الرفض",
   "$Price": "السعر بالدولار",
   "Bio URL Price": "سعر اضافة رابط بالدولار",
   "Complete": "إتمام",
   "Communication": "جودة التواصل",
   "Professionalism": "الرسمية في التعامل",
   "Recommendation to Work with": "التوصية للعمل مع المؤثر",
   "Leave a private feedback": "Leave a private feedback",
   "This will not be shown to the influencer": "This will not be shown to the influencer",
   "Leave private feedback (this will not be shown to influencer)": "يرجى ترك ملاحظات خاصة (ان هذي الملاحظات لن يراها المؤثر)",
   home: {
      main_legend: "سبارك ترند هو اول منصة إلكترونية لبيع وشراء إعلانات الإنستقرام .",
      targeted_influencers_desc: "نحن نقسم المؤثرين المسجلين إلى مجموعات إسنادًا على احصائيات الحساب. على سبيل المثال اعلى الدول متابعة، الفئة العمرية، الجنس، عدد المتابعين، وحتى نوع الحساب ",
      secure_transaction_desc: "موقع سبارك ترند سوف يحتفظ بنقودك في مكان امن حتى ينتهي المؤثر من اتمام حملتك الدعائية ومن ثم يحول المال إلى المؤثر .",
      easy2_use_desc: "منصة سبارك ترند تحاول قدر المستطاع من تسهيل عملية البيع والشراء لراحة الطرفين."
   },
   shoutout_history: "{1} out of {0}",
   demograph_chart: {
      age_range_desc: "هذا الرسم البياني يزودك ببيانات الفئة العمرية لمتابعين المؤثر و يساعدك على استهداف الشريحة المعينة لاعلانك.",
      location_desc: "هذا الرسم البياني يزودك ببيانات دول متابعين المؤثر.",
      gender_desc: "هذا الرسم البياني يزودك ببيانات جنس متابعين المؤثر"
   },
   order: {
      error: {
         no_such_product: "لا يوجد منتج بهذا الاسم",
         invalid_product: "منتج خاطئ",
         cannot_buy_own_product: "لا تسطيع شراء إعلانك",
         empty_posts: "الرجاء تزويد الموقع بمنشورة واحدة على الأقل",
         account_empty: "هذا الحساب ليس موجود",
         paypal_error: "عملية الشراء عبر PayPal قد فشلت. الرجاء المحاولة مرة أخرى في وقت لاحق",
         paid_amount_mismatch: "عدم تطابق السعر المجمل. الرجاء المحاولة مرة أخرى في وقت لاحق",
         unverified_user: "الرجاء إكمال اجراء تحقيق البريد الإلكتروني",
         unknown_action: "طلب غير معروف",
         no_ownership: "ليس لديك أي سلطة على هذا الطلب",
         rejected_order: "الطلب مرفوض",
         invalid_ownership: "طلب غير مفهوم",
         expired_order: "تم انتهاء صلاحية الطلب.",
         buyer_invalid_start_time: "يحق لك الإعلان بعد ٤٨ ساعة من الان ",
         seller_invalid_start_time: "لا تستطيع بداء هذا الطلب الان. الرجاء الانتظار لموعد الإعلان المتفق عليه",
         cannot_complete_before_time: "لا تستطيع اتمام الطلب قبل الموعد المتفق عليه",
         invalid_action: "طلب مرفوض",
         already_paid: "تم دفع القيمة الكاملة للإعلان ",
         not_paid_yet: "لم يتم الدفع لهذا الطلب",
         unknown_reason: "لقط حصل خطاء. الرجاء المحاولة مرة أخرى في وقت لاحق",
         //new
         cannot_rate_before_payment: "لا يمكنك تقيم الإعلان قبل الشراء",
         cannot_change_feedback_after_completion: "لا يمكنك تعديل رأيك بالخدمة بعد اكتمال الطلب وانتهائه "
      },
      success: {
         order_accepted: "تم قبول الطلب!",
         order_rejected: "تم رفض الطلب!",
         order_started: "تم بدء الطلب",
         order_completed: "تم إنهاء الطلب",
         order_paid: "تمت عملية الدفع بنجاح!",
         order_refunded: "استرداد المال للطلب",
         order_rated: "تم استلام تقيمك بنجاح"
      },
      feedback_solicit: "ساعدنا في تحسين خدمتك في سبارك ترند بتسليم تقيمك",
      feedback_guide: " يمكنك تسليم تقيمك للمنتج بعد الدفع. يمكنك تعديل تقيمك قبل اكتمال الإعلان",
      upload_screenshot_guide: "الرجاء ارفاق صورة لشاشة الإعلان. الرجاء التاكد من ان صورة الشاشة تحتوي على صورة الإعلان، الاقتباس، والمدة الزمنية في اسفل الإعلان. (الرجاء مراجعة \"دليل البائع\" في اسفل الصفحة، خطوة رقم ٩ لمشاهدة المثال)"
   },
   error: {
      default: "حدث خطاء ما. الرجاء المحاولة مرة أخرى في وقت لاحق"
   },
   instaaccount: {
      status: {
         verified: 'تم التوثيق',
         unverified: 'لم يتم التوثيق',
         in_progress: 'جاري التوثيق'
      },
      error: {
         invalid_account: "الحساب غير موجود",
         instagram_already_exists: "هذا الحساب موجود من السابق",
         cannot_get_instagram_account: "لا نستطيع ايجاد بيانات حسابك",
         insufficient_followers: "عدد المتابعين اقل من المطلوب",
         insta_verification_failed: "لم يتم التوثيق بنجاح",
         product_save_failed: "لم يتم حفظ المنتج بنجاح",
         invalid_data: "بيانات خاطئة",
         verification_failed: "لقد فشل التوثيق.",
         insights_upload_failed: "لم يتم رفع الصورة بنجاح"
      },
      success: {
         insights_uploaded: "تم رفع الإحصائيات بنجاح",
         product_saved: "تم حفظ المنتج بنجاح"
      }
   },
   guide: {
      seller: {
         one: "أضف الحساب عبر الذهاب الى لوحة المستخدم > منتجاتي > اضافة حساب جديد.",
         two: "ادخل الاسم المستعار لحساب الإنستقرام ومن ثم أضغط تأكيد. (يجب ان يكون لديك على الاقل ١٠،٠٠٠ متابع في حسابك وان يكون حساب تجاري). ومن ثم اضغط التالي.) ",
         three: "لكي يتم توثيق حسابك وتستطيع البدء ببيع الإعلانات، الرجاء اضافة الرمز التالي إلى خانة السيرة الذاتية لكي يتم توثيق حسابك ",
         four: "قم بتحميل لقطات من احصائياتك (الجنس ، الفئة العمرية ، أفضل موقع للبلد والوقت النشط).  يمكنك تخطي هذا إذا كنت قد قمت للتو بتشغيل ملفك الشخصي للنشاط التجاري لأن الأمر قد يستغرق أسبوعًا للحصول على إحصاءات.  لاحظ أنه إذا لم يكن لديك احصائيات بعد ، فلا يمكننا تأكيد أنك بائع معتمد ، مما يعني أنه عليك الانتظار للبيع في سبارك ترند حتى الآن.",
         five: " بعد ذلك ، قم بملء تفاصيل منتجك وحدد السعر لجميع أنواع الاعلانات التي تريد بيعها ، ثم انقر فوقإضافة منتج",
         six: "الآن وبعد أن أصبحت جاهزًا تمامًا ، تم إنشاء منتجك.  الرجاء الانتظار حتى يتحقق المسؤول التنفيذي لدينا من صحة منتجك خلال 24 ساعة.  بعد ذلك ، ستتمكن من مشاركة منتجاتك والانتظار حتى يقوم شخص ما بشرائها.",
         seven: {
            q: "لقد قمت ببيع!  شخص اشترى للتو واحدة من المنتجات الخاصة بي!  ماذا يجب أن أفعل؟",
            a: "ما عليك سوى الانتقال إلى الطلب ، والانتقال إلى لوحة التحكم، ثم مبيعاتي، ومن ثم الانتقال إلى قسم الطلب.  يمكنك اختيار ما إذا كنت تريد القبول أو الرفض.  لديك 36 ساعة لاتخاذ إجراء قبل رفض الطلب تلقائيًا من قبل النظام."
         },
         eight: {
            q: "لقد قمت ببيع!  شخص اشترى للتو واحدة من المنتجات الخاصة بي!  ماذا يجب أن أفعل؟",
            a: "إذا قبلت الطلب ، سيتم نقل الاعلان إلى القبول ، ويمكنك المتابعة لنشر العروض الترويجية عندما يحين وقت النشر."
         },
         nine: 'بعد أن يأتي وقت النشر، الرجاء القيام بتنزيل الصورة مع الاقتباس، ثم نشرها ، ويرجى التأكد من اضافة الرمز الفريد الى مقتبس الصورة. بعد نشرها، انقر على زر "ابداء". بعد انتهاء وقت النشر ، يمكنك النقر على زر "رفع صورة شاشة" ثم قم بارفاق صورة لشاشة الإعلان. الرجاء التاكد من ان صورة الشاشة تحتوي على صورة الإعلان، الاقتباس، والمدة الزمنية في اسفل الإعلان. ثم قم بالنقر فوق زر "إتمام".'
      },
      buyer: {
         one: "اذهب الى (تصفح) واختر احد المؤثرين للإعلان لديه.",
         two: "بمجرد اختيارك ، يمكنك أيضًا تحديد نوع الإعلان ومتى يكون أفضل وقت للإعلان.  انقر فوق [طلب الإعلان] للمتابعة.",
         three: "قم بتحميل الصورة التي تريد أن تكون المنشور وحدد التاريخ والتعليق بالإضافة إلى معلومات إضافية.  وانقر فوق [طلب الإعلان]",
         four: "للتحقق من حالة النشر ، انتقل إلى خانة الاعلانات المدفوعة",
         five: "سيتم إعادة توجيهك إلى مراجعة المعاملة ، بمجرد التأكد من صحتها ، يمكنك معالجة الدفع عبر بي بال (PayPal)",
         six: "للتحقق من حالة المنشور الخاص بك ، انتقل إلى لوحة التحكم > مشترياتي."
      }
   }
}
ar.order_status = {shoutout: {}, payment: {}}
ar.order_status.shoutout[OrderStatus.SHOUTOUT.NOT_CREATED] = 'الطلب لم ينشاء'
ar.order_status.shoutout[OrderStatus.SHOUTOUT.CREATED] = 'طلب'
ar.order_status.shoutout[OrderStatus.SHOUTOUT.ACCEPTED] = 'الطلب مقبول'
ar.order_status.shoutout[OrderStatus.SHOUTOUT.STARTED] = 'الطلب جاري'
ar.order_status.shoutout[OrderStatus.SHOUTOUT.COMPLETED] = 'تمم اتمام الطلب'
ar.order_status.shoutout[OrderStatus.SHOUTOUT.REJECTED] = 'الطلب غير مقبول'
ar.order_status.shoutout[OrderStatus.SHOUTOUT.EXPIRED] = 'انتهاء صلاحية الطلب'
ar.order_status.payment[OrderStatus.PAYMENT.NOT_PAID] = 'في انتظار الدفع'
ar.order_status.payment[OrderStatus.PAYMENT.PAID] = 'تم الدفع!'
ar.order_status.payment[OrderStatus.PAYMENT.REFUNDED] = 'النقود مستردة'
export default ar;