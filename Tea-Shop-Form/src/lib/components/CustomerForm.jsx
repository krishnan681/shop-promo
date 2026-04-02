import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
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

    // ✅ MOBILE VALIDATION
    if (!/^[6-9][0-9]{9}$/.test(mobile)) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Mobile Number",
        text: "Enter a valid 10-digit number starting with 6–9",
        confirmButtonColor: "#000",
      });
      setLoading(false);
      return;
    }

    try {
      await handleCustomerSubmit({ name, mobile, bakeryid });

      const result = await Swal.fire({
        icon: "success",
        title: "🎉 Reward Unlocked!",
        text: "Your offer has been successfully claimed.",
        confirmButtonText: "Download App",
        showCancelButton: true,
        cancelButtonText: "Close",
        confirmButtonColor: "#000",
      });

      // Redirect to Play Store
      if (result.isConfirmed) {
        window.open(
          "https://play.google.com/store/apps/details?id=com.celfonphonebookapp&pcampaignid=web_share",
          "_blank"
        );
      }

      setName("");
      setMobile("");

    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.message,
        confirmButtonColor: "#000",
      });
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
      <div className="container">

        {/* HERO */}
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

        {/* FORM */}
        <div className="form-section">

          <div className="info-box">
            <h2>Welcome To Kovai</h2>
            <p>
              If Youre searching for any Firm or Product Supplier at coimbatore Find in
              <strong>CELFON BOOK</strong>. type Your Name, Number <br /> Open <strong>CELFON BOOK</strong> APP and Find
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* NAME */}
            <input
              type="text"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            {/* MOBILE */}
            <input
              type="tel"
              inputMode="numeric"
              placeholder="Enter Mobile Number"
              value={mobile}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "").slice(0, 10);
                setMobile(value);
              }}
              maxLength={10}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? "Processing..." : "Open CELFON BOOK"}
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

          {/* FOOTER */}
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