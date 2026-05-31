"use client";

import { useEffect, useMemo, useState } from "react";

const packages = [
  { value: 39.9, type: "ticket", label: "早鸟单人夜游票" },
  { value: 79.9, type: "pair", label: "双人夜游票" },
  { value: 199, type: "pair", label: "双人约会套餐" },
  { value: 399, type: "family", label: "家庭周末套餐" },
  { value: 299, type: "group", label: "团建/生日咨询金" }
];

const productCopy = {
  ticket: "早鸟单人夜游票，适合先锁定七夕主题周名额，含入园夜游与基础打卡动线。",
  pair: "双人产品，适合情侣或闺蜜，含花笺互动、指定打卡点与预约核销。",
  family: "家庭周末套餐，适合亲子白天加傍晚入园，现场需按餐位与游玩项目确认。",
  group: "团建/生日咨询金，作为预约锁档使用，最终方案按人数、餐饮和布置另行确认。"
};

const sections = [
  ["开业定位", "七夕主题夜游 + 周末主开业，用早鸟票拉新，用双人套餐、餐饮、生日团建和营帐产品承接利润。"],
  ["产品结构", "29.9 元起早鸟票做引流，59.9-79.9 元双人夜游票做主销，99-299 元餐饮约会套餐做利润。"],
  ["游玩动线", "入口花门、花园主景、轻互动、餐饮转化、离场复购，每 10-15 分钟给游客一个停留理由。"],
  ["运营重点", "停车、厕所、出餐、灯光、驱蚊避暑、核销收银要先跑通，首期建议预约限流。"]
];

function formatLocalDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getPackageUnits(type, guests) {
  if (type === "ticket") return guests;
  if (type === "pair") return Math.ceil(guests / 2);
  if (type === "family") return Math.ceil(guests / 4);
  return Math.max(1, Math.ceil(guests / 20));
}

export default function HomePage() {
  const [visitDate, setVisitDate] = useState("");
  const [guests, setGuests] = useState(2);
  const [packageIndex, setPackageIndex] = useState(1);

  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setVisitDate(formatLocalDate(tomorrow));
  }, []);

  const quote = useMemo(() => {
    const selectedPackage = packages[packageIndex];
    const units = getPackageUnits(selectedPackage.type, guests);
    const total = selectedPackage.value * units;

    return {
      price: `¥${total.toLocaleString("zh-CN", {
        minimumFractionDigits: total % 1 === 0 ? 0 : 1,
        maximumFractionDigits: 1
      })}`,
      text: `${selectedPackage.label}，${guests}人到访。${productCopy[selectedPackage.type]}`
    };
  }, [guests, packageIndex]);

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#top">
          <span className="brand-mark">虞</span>
          <span>
            <strong>虞见花园</strong>
            <small>沭阳花园微度假</small>
          </span>
        </a>
        <nav>
          <a href="#product">套餐</a>
          <a href="#route">动线</a>
          <a href="#booking">预约</a>
          <a href="#location">位置</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-content">
            <p className="eyebrow">2026.8.19 七夕限定夜场 / 8.21-8.23 周末主开业</p>
            <h1>虞见花园 · 沭阳七夕夜游会</h1>
            <p className="hero-copy">七夕夜，来虞见花园走一段灯光花路，拍一组浪漫照片，和喜欢的人坐下来吃点好吃的，把普通晚上过成值得记住的约会。</p>
            <div className="hero-actions">
              <a className="button primary" href="#booking">锁定早鸟名额</a>
              <a className="button ghost" href="#route">查看游玩动线</a>
            </div>
          </div>
          <div className="hero-panel">
            <div><span>早鸟夜游票</span><strong>29.9 元起</strong></div>
            <div><span>首期建议限流</span><strong>200人</strong></div>
            <div><span>主推客群</span><strong>情侣 / 闺蜜 / 拍照</strong></div>
          </div>
        </section>

        <section id="product" className="section">
          <p className="eyebrow">Product Strategy</p>
          <h2>门票负责拉新，套餐负责赚钱</h2>
          <div className="card-grid">
            {packages.map((item) => (
              <article className="card" key={item.label}>
                <span>{item.label}</span>
                <strong>¥{item.value}</strong>
                <p>{productCopy[item.type]}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="route" className="section section-band">
          <p className="eyebrow">Experience Flow</p>
          <h2>每 10-15 分钟，都给游客一个停留理由</h2>
          <div className="card-grid">
            {sections.map(([title, text]) => (
              <article className="card" key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="booking" className="section booking">
          <p className="eyebrow">Booking</p>
          <h2>先选一个可成交产品</h2>
          <div className="booking-layout">
            <form className="booking-form">
              <label>
                到访日期
                <input type="date" min={visitDate} value={visitDate} onChange={(event) => setVisitDate(event.target.value)} />
              </label>
              <label>
                人数
                <select value={guests} onChange={(event) => setGuests(Number(event.target.value))}>
                  <option value="1">1人</option>
                  <option value="2">2人</option>
                  <option value="4">4人</option>
                  <option value="8">8人</option>
                  <option value="20">20人</option>
                </select>
              </label>
              <label>
                产品
                <select value={packageIndex} onChange={(event) => setPackageIndex(Number(event.target.value))}>
                  {packages.map((item, index) => <option value={index} key={item.label}>{item.label}</option>)}
                </select>
              </label>
            </form>
            <aside className="quote">
              <span>预估订单</span>
              <strong>{quote.price}</strong>
              <p>{quote.text}</p>
            </aside>
          </div>
        </section>

        <section id="location" className="section section-band">
          <p className="eyebrow">Location</p>
          <h2>地址与导航</h2>
          <p className="wide-copy">地址位于江苏省沭阳县耿圩镇，靠近耿圩多肉体验中心。到达附近后，可按路边指引进入营地停车区。</p>
          <a className="button primary" href="https://map.baidu.com/search/%E6%B1%9F%E8%8B%8F%E7%9C%81%E6%B2%AD%E9%98%B3%E5%8E%BF%E8%80%BF%E5%9C%A9%E9%95%87%E5%9C%A8%E4%B9%A1%E9%87%8E%E8%BD%BB%E5%A5%A2%E9%9C%B2%E8%90%A5" target="_blank" rel="noreferrer">一键导航</a>
        </section>
      </main>

      <footer>
        <strong>虞见花园 · 沭阳七夕夜游会</strong>
        <span>早鸟预售 / 花园夜游 / 餐饮套餐 / 生日团建</span>
      </footer>
    </>
  );
}
