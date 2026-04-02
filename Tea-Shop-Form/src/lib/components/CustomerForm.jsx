import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { handleCustomerSubmit } from "../controllers/customerController";
import { promoMap } from "../utils/promoMap";
import "../css/form.css";

const CustomerForm = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [shopImage, setShopImage] = useState("");
  
  const bidParam = searchParams.get("bid");
  const bakeryid = bidParam ? Number(bidParam) : null;
  
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  
  const shopName = bakeryid ? promoMap[bakeryid] : null;

  useEffect(() => {
    const images = {
      1: "https://images.unsplash.com/photo-1555507036-ab1f4038808a",
      2: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e",
      3: "https://images.unsplash.com/photo-1517433367423-c7e5b0f35086",
      4: "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
    };
    setShopImage(images[bakeryid] || images[1]);
  }, [bakeryid]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await handleCustomerSubmit({ name, mobile, bakeryid });
      toast.success("🎉 Reward unlocked! Check your SMS");
      setName("");
      setMobile("");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!bakeryid || !shopName) {
    return (
      <div className="error-screen">
        <h2>Invalid QR Code</h2>
        <p>Please scan the correct QR code at the shop.</p>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <Toaster position="bottom-center" />
      <div className="container">
        {/* HERO - Shop Name with White Background at Top */}
        <div
          className="hero"
          style={{ backgroundImage: `url(${shopImage})` }}
        >
          <div className="hero-header">
            <div className="shop-name-box">
              <h1>{shopName}</h1>
            </div>
            <p className="offer-text">Exclusive Offer for Customers 🎁</p>
          </div>
        </div>

        {/* FORM SECTION */}
        <div className="form-section">
          <div className="info-box">
            <h2>Get Your Reward</h2>
            <p>
              Enter your details to receive offers, updates and rewards from
              <strong> Signpost PHONE BOOK</strong>.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="tel"
              placeholder="Enter Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? "Processing..." : "Claim My Reward"}
            </button>
          </form>

          {/* APP PROMOTION */}
          <div className="app-box">
            <p>
              📲 Download our{" "}
              <span className="app-name">Cel</span>
              <span className="app-name fon">fon</span> book app for more rewards
            </p>
            <p className="click-text">
              Click here <span className="arrow">➜</span>
            </p>
            <a
              href="https://play.google.com/store/apps/details?id=com.celfonphonebookapp&pcampaignid=web_share"
              target="_blank"
              rel="noopener noreferrer"
              className="playstore-badge-link"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Get it on Google Play"
                className="playstore-badge"
              />
            </a>
          </div>

          {/* TRUST + COMPANY INFO */}
          <div className="footer">
            <p>🔒 Your data is secure and will not be misused</p>
            <p className="company">
              Signpost Celfon.in Technology<br />
              Coimbatore - 641021<br />
              📞 95145 55132
            </p>
            <p className="copyright">
              © 2025 SIGNPOST CELFON.IN TECHNOLOGY
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerForm;