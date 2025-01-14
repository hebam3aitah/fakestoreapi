// تعريف كلاس المنتج
class Product {
    constructor(title, price, description, image) {
      this.title = title; //Title عنوان المنتج
      this.price = price; // سعر المنتج
      this.description = description; //Description وصف المنتج
      this.image = image; // صورة المنتج
    }
  }
  
  // عنوان الـ API الأساسي
  const apiUrl ="https://6784b1aa1ec630ca33a5342a.mockapi.io/employee";
  // **1. دالة لجلب المنتجات وعرضها**
  async function fetchProducts() {
    try {
      const response = await fetch(apiUrl); // استدعاء API
      const products = await response.json(); // تحويل البيانات إلى JSON
      renderProducts(products.slice(0, 20)); // عرض أول 20 منتج
    } catch (error) {
      console.error("خطأ أثناء جلب المنتجات:", error);
    }
  }
  
  // **2. دالة لعرض المنتجات كبطاقات**
  function renderProducts(products) {
    const main = document.querySelector("main");
    main.innerHTML = ""; // تنظيف المحتوى القديم
    products.forEach((product) => {
      const card = document.createElement("div");
      card.classList.add("product-card");
  
      // محتوى البطاقة
      card.innerHTML = `
        <img src="${product.image}" alt="${product.title}" />

        <h2>${product.Title}</h2>
        <p><strong>Description:</strong>${product.Description}</p>
        <p><strong>Price :</strong> $${product.price}</p>
        <button onclick="deleteProduct(${product.id})">حذف</button>
        <button onclick="updateProduct(${product.id})">تحديث</button>
      `;
      main.appendChild(card); // إضافة البطاقة إلى الصفحة
    });
  }
  
  // **3. دالة لإنشاء منتج جديد**
  async function createProduct(product) {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product), // إرسال بيانات المنتج الجديد
      });
      const newProduct = await response.json();
      console.log("تم إنشاء المنتج:", newProduct);
      fetchProducts(); // تحديث قائمة المنتجات
    } catch (error) {
      console.error("خطأ أثناء إنشاء المنتج:", error);
    }
  }
  
  // **4. دالة لتحديث منتج**
  async function updateProduct(id) {
    const updatedTitle = prompt("أدخل العنوان الجديد:");
    if (!updatedTitle) return;
  
    try {
      const response = await fetch(`${apiUrl}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: updatedTitle }), // إرسال العنوان الجديد
      });
      const updatedProduct = await response.json();
      console.log("تم تحديث المنتج:", updatedProduct);
      fetchProducts(); // تحديث قائمة المنتجات
    } catch (error) {
      console.error("خطأ أثناء تحديث المنتج:", error);
    }
  }
  
  // **5. دالة لحذف منتج**
  async function deleteProduct(id) {
    try {
      const response = await fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
      });
      console.log("تم حذف المنتج:", await response.json());
      fetchProducts(); // تحديث قائمة المنتجات
    } catch (error) {
      console.error("خطأ أثناء حذف المنتج:", error);
    }
  }
  
  // استدعاء أولي لجلب المنتجات عند تحميل الصفحة
  fetchProducts();
  
// استيراد الكود السابق هنا...

// **معالجة إضافة المنتج عبر النموذج**
document.getElementById("product-form").addEventListener("submit", (event) => {
  event.preventDefault(); // منع إعادة تحميل الصفحة

  // الحصول على بيانات المنتج من النموذج
  const title = document.getElementById("title").value;
  const price = parseFloat(document.getElementById("price").value);
  const description = document.getElementById("description").value;
  //const image = document.getElementById("image").value;

  // إنشاء منتج جديد باستخدام الدالة createProduct
  const newProduct = new Product(title, price, description);
  createProduct(newProduct);

  // إعادة تعيين النموذج
  event.target.reset();
});

  