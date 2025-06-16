from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from bs4 import BeautifulSoup
import time
import csv

# ----- Cấu hình Selenium -----
options = Options()
options.add_argument("--headless")
options.add_argument("--disable-gpu")
driver = webdriver.Chrome(options=options)

BASE_URL = "https://orchard.vn"
CATEGORIES = [
    "/nuoc-hoa-nam/",
    "/nuoc-hoa-nu/",
    "/nuoc-hoa-unisex/"
]

MAX_PRODUCTS = 30  # Giới hạn 30 sản phẩm
products = []

print("🚀 Bắt đầu cào dữ liệu Orchard.vn...")

for category_path in CATEGORIES:
    if len(products) >= MAX_PRODUCTS:
        break

    category_url = BASE_URL + category_path
    driver.get(category_url)
    time.sleep(5)

    soup = BeautifulSoup(driver.page_source, "html.parser")
    product_elements = soup.select(".product-small.box")

    print(f"🔍 {category_url} - Tìm thấy {len(product_elements)} sản phẩm.")

    for idx, product in enumerate(product_elements, 1):
        if len(products) >= MAX_PRODUCTS:
            break

        try:
            title_el = product.select_one(".product-title")
            price_el = product.select_one(".price")
            link_el = product.select_one("a")

            if not (title_el and price_el and link_el):
                continue

            title = title_el.text.strip()
            price = price_el.text.strip()
            link = link_el["href"]
            if not link.startswith("http"):
                link = BASE_URL + link

            # Truy cập trang chi tiết
            driver.get(link)
            time.sleep(2)

            detail_soup = BeautifulSoup(driver.page_source, "html.parser")
            image_tags = detail_soup.select(".woocommerce-product-gallery__image img")

            image_links = []
            for img in image_tags:
                src = img.get("src") or img.get("data-src")
                if src and src not in image_links:
                    image_links.append(src)

            products.append({
                "Tên sản phẩm": title,
                "Giá": price,
                "Link sản phẩm": link,
                "Link hình ảnh": "; ".join(image_links),
                "Loại": category_path.replace("/nuoc-hoa-", "").replace("/", "")
            })

            print(f"{len(products)}. ✅ {title} ({len(image_links)} ảnh)")

        except Exception as e:
            print(f"⚠️ Lỗi sản phẩm: {e}")
            continue

driver.quit()

# ----- Lưu dữ liệu -----
if products:
    import os
    output_path = os.path.abspath("orchard_perfume_30.csv")
    with open(output_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=products[0].keys())
        writer.writeheader()
        writer.writerows(products)
    print(f"\n✅ Đã lưu {len(products)} sản phẩm vào:\n📄 {output_path}")
else:
    print("⚠️ Không có dữ liệu để lưu.")
