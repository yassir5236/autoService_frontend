import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getCars, getMyCars, createCar, updateCar, deleteCar, toggleCarAvailability } from "../services/carService.jsx";
import { getUsers, getCurrentUser, updateProfile } from "../services/userService.jsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import {
  Search,
  Calendar,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Star,
  Settings,
  Gauge,
  Zap,
  Car,
  Headphones,
  Clock,
  Globe,
  Menu,
  User,
  Heart,
  ArrowLeft,
  Plus,
  Edit2,
  Trash2,
} from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────
const carsData = [
  {
    id: 1,
    name: "Mercedes A 200",
    category: "LIMOUSINE",
    engine: "PB",
    transmission: "Automatic",
    mileage: "163 KM",
    drive: "2WD",
    rating: 4,
    price: 89,
    image:
      "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=400&q=80",
    featured: false,
  },
  {
    id: 2,
    name: "Mercedes-AMG GT R",
    category: "CABRIOLET",
    engine: "AMG",
    transmission: "Automatic",
    mileage: "585 KM",
    drive: "2WD",
    rating: 5,
    price: 789,
    image:
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=400&q=80",
    featured: true,
  },
  {
    id: 3,
    name: "Mercedes E 200",
    category: "LIMOUSINE",
    engine: "PB",
    transmission: "Automatic",
    mileage: "197 KM",
    drive: "2WD",
    rating: 4,
    price: 189,
    image:
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&q=80",
    featured: false,
  },
  {
    id: 4,
    name: "BMW M5 Competition",
    category: "SEDAN",
    engine: "V8",
    transmission: "Automatic",
    mileage: "625 KM",
    drive: "AWD",
    rating: 5,
    price: 599,
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&q=80",
    featured: false,
  },
  {
    id: 5,
    name: "Audi RS6 Avant",
    category: "WAGON",
    engine: "V8T",
    transmission: "Automatic",
    mileage: "441 KM",
    drive: "4WD",
    rating: 5,
    price: 449,
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&q=80",
    featured: false,
  },
];

const advantages = [
  {
    id: 1,
    icon: Headphones,
    title: "24/7 Customer Online Support",
    subtitle: "Call us Anywhere Anytime",
    highlighted: false,
  },
  {
    id: 2,
    icon: Clock,
    title: "Reservation Anytime You Wants",
    subtitle: "24/7 Online Reservation",
    highlighted: true,
  },
  {
    id: 3,
    icon: Globe,
    title: "Lots of Picking Locations",
    subtitle: "250+ Locations",
    highlighted: false,
  },
];

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────
function StarRating({ rating, max = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          size={13}
          className={i < rating ? "text-orange-500 fill-orange-500" : "text-gray-300 fill-gray-300"}
        />
      ))}
    </div>
  );
}

function SpecBadge({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-100 rounded-md px-2 py-1.5 text-xs text-gray-600 font-medium">
      <Icon size={12} className="text-gray-400" />
      {label}
    </div>
  );
}

function CarCard({ car, onEdit, onDelete, onToggleAvailability, isAdmin }) {
  return (
    <div
      className={`bg-white  overflow-hidden t ransition-all duration-300 hover:-translate-y-1 hover:shadow-2xl group ${car.featured
          ? "shadow-xl ring-2 ring-orange-400 ring-offset-2"
          : "shadow-md border border-gray-100"
        }`}
    >
      {/* Car image */}
      <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 h-64 flex items-center justify-center overflow-hidden">
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1485291571150-772bcfc10da5?w=400&q=80";
          }}
        />
        {/* CRUD buttons overlay */}
        {isAdmin && (
        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => onEdit(car)}
            className="bg-white/90 backdrop-blur-sm p-1.5 rounded-lg shadow hover:bg-blue-50 hover:text-blue-600 transition-colors"
          >
            <Edit2 size={13} />
          </button>
          <button
            onClick={() => onDelete(car.id)}
            className="bg-white/90 backdrop-blur-sm p-1.5 rounded-lg shadow hover:bg-red-50 hover:text-red-500 transition-colors"
          >
            <Trash2 size={13} />
          </button>
        </div>
        )}
      </div>

      {/* Card body */}
      <div className="p-4">
        <div className="mb-3">
          <h3 className="font-bold text-gray-900 text-base leading-tight">{car.name}</h3>
          <span className="text-orange-500 text-[10px] font-semibold tracking-widest uppercase">
            {car.category}
          </span>
        </div>

        {/* Specs grid */}
        <div className="grid grid-cols-2 gap-1.5 mb-3">
          <SpecBadge icon={Zap} label={car.engine} />
          <SpecBadge icon={Settings} label={car.transmission} />
          <SpecBadge icon={Gauge} label={car.mileage} />
          <SpecBadge icon={Car} label={car.drive} />
        </div>

        {/* Rating + Price */}
        <div className="flex items-center justify-between mb-3">
          <StarRating rating={car.rating} />
          <span className="text-xl font-bold text-gray-900">
            DH {car.price}
          </span>
        </div>

        {/* Rent button */}
        <div className="space-y-2">
          <button
            disabled={!car.available}
            className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200
              ${
                car.available
                  ? "bg-orange-500 text-white hover:bg-orange-600"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
          >
            {car.available ? "Rent Now →" : "Not Available"}
          </button>

          {!isAdmin && (
            <button
              onClick={() => onToggleAvailability(car)}
              className="w-full py-2 border border-gray-300 rounded-xl text-sm hover:bg-gray-50"
            >
              Mark as {car.available ? "Unavailable" : "Available"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function AdvantageCard({ icon: Icon, title, subtitle, highlighted }) {
  return (
    <div
      className={`rounded-2xl p-7 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 ${highlighted
          ? "bg-gray-700 text-white shadow-xl"
          : "bg-white text-gray-800 shadow-md border border-gray-100 hover:shadow-xl"
        }`}
    >
      <div
        className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 ${highlighted ? "bg-gray-600" : "bg-orange-50"
          }`}
      >
        <Icon size={26} className={highlighted ? "text-orange-400" : "text-orange-500"} />
      </div>
      <h4 className={`font-bold text-base mb-1.5 ${highlighted ? "text-white" : "text-gray-900"}`}>
        {title}
      </h4>
      <p className={`text-sm ${highlighted ? "text-gray-400" : "text-gray-500"}`}>{subtitle}</p>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
  export default function RentCarLanding() {
    // const [cars, setCars] = useState(carsData);
    const [cars, setCars] = useState([]);
    useEffect(() => {
    fetchCars();
    fetchUsers();
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await getCurrentUser();
      if (res.data) {
        setCurrentUser(res.data);
        setProfileImagePreview(res.data.profilePicture || null);
      }
    } catch (e) {
      // Token expired or invalid — clear stale auth data
      if (e.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("isLoggedIn");
      }
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching users:", err);
      setUsers([]);
    }
  };

  const fetchCars = async () => {
    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");
    try {
      if (!token) {
        // Not logged in — show nothing
        setCars([]);
        return;
      }
      if (role === "ADMIN") {
        const res = await getCars();
        setCars(res.data);
      } else {
        const res = await getMyCars();
        setCars(Array.isArray(res.data) ? res.data : []);
      }
    } catch (err) {
      console.error("Error fetching cars:", err);
      setCars([]);
    }
  };
  const [activeTab, setActiveTab] = useState("Short-term rental");
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const tabs = ["Short-term rental", "Long-term rental", "Exclusive transport"];

  // ── All state declarations ──
  const [isAdmin, setIsAdmin] = useState(false);
  const [showCarModal, setShowCarModal] = useState(false);
  const [editingCar, setEditingCar] = useState(null);
  const [users, setUsers] = useState([]);
  // Admin filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [carForm, setCarForm] = useState({
    name: "",
    category: "",
    price: "",
    engine: "",
    transmission: "",
    mileage: "",
    drive: "",
    available: true,
    userId: "",
  });
  const [carImageFile, setCarImageFile] = useState(null);
  const [carImagePreview, setCarImagePreview] = useState(null);

  // Profile modal state
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [profileForm, setProfileForm] = useState({ username: "" });
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem("role");
    setIsAdmin(role === "ADMIN");
  }, []);

 const handleDelete = async (id) => {
  await deleteCar(id);
  fetchCars();
};

const handleToggleAvailability = async (car) => {
  await toggleCarAvailability(car.id, !car.available);
  fetchCars();
};

const handleEdit = (car) => {
  setEditingCar(car);
  setCarForm({
    name: car.name,
    category: car.category,
    price: car.price,
    engine: car.engine,
    transmission: car.transmission,
    mileage: car.mileage,
    drive: car.drive,
    available: car.available,
    userId: car.owner?.id ?? "",
  });
  setCarImageFile(null);
  setCarImagePreview(car.image || null);
  setShowCarModal(true);
};

const handleSaveCar = async () => {
  const formData = new FormData();
  formData.append("name", carForm.name);
  formData.append("category", carForm.category);
  formData.append("price", carForm.price);
  formData.append("engine", carForm.engine);
  formData.append("transmission", carForm.transmission);
  formData.append("mileage", carForm.mileage || "");
  formData.append("drive", carForm.drive || "");
  formData.append("available", carForm.available);
  formData.append("userId", carForm.userId);
  if (carImageFile) formData.append("image", carImageFile);

  if (editingCar) {
    await updateCar(editingCar.id, formData);
  } else {
    await createCar(formData);
  }

  fetchCars();
  setShowCarModal(false);
};

const handleAddCar = () => {
  setEditingCar(null);
  setCarForm({
    name: "",
    category: "",
    price: "",
    engine: "",
    transmission: "",
    mileage: "",
    drive: "",
    available: true,
    userId: "",
  });
  setCarImageFile(null);
  setCarImagePreview(null);
  setShowCarModal(true);
};

const handleOpenProfile = async () => {
  try {
    // Use cached data if available for instant open, then refresh in background
    if (currentUser) {
      setProfileForm({ username: currentUser.username || "" });
      setProfileImagePreview(currentUser.profilePicture || null);
      setProfileImageFile(null);
      setProfileSuccess(false);
      setShowProfileModal(true);
    } else {
      const res = await getCurrentUser();
      setCurrentUser(res.data);
      setProfileForm({ username: res.data.username || "" });
      setProfileImagePreview(res.data.profilePicture || null);
      setProfileImageFile(null);
      setProfileSuccess(false);
      setShowProfileModal(true);
    }
  } catch (e) {
    console.error("Failed to load profile", e);
  }
};

const handleProfileImageChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  setProfileImageFile(file);
  setProfileImagePreview(URL.createObjectURL(file));
};

const handleSaveProfile = async () => {
  setProfileSaving(true);
  try {
    const formData = new FormData();
    formData.append("username", profileForm.username);
    if (profileImageFile) formData.append("profilePicture", profileImageFile);
    const res = await updateProfile(formData);
    // Immediately reflect changes everywhere — no reload needed
    setCurrentUser(res.data);
    setProfileImagePreview(res.data.profilePicture || profileImagePreview);
    setProfileSuccess(true);
    setTimeout(() => setShowProfileModal(false), 1200);
  } catch (e) {
    console.error("Failed to save profile", e);
  } finally {
    setProfileSaving(false);
  }
};

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* ── BACK BUTTON ── */}
      <button
        onClick={() => window.history.back()}
        className="fixed top-4 left-4 z-50 bg-white/90 backdrop-blur-sm shadow-md px-3 py-2 rounded-xl flex items-center gap-2 text-sm font-medium text-gray-700 hover:bg-white hover:shadow-lg transition-all duration-200"
      >
        <ArrowLeft size={15} />
        Back
      </button>

      {/* ══════════════════════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════════════════════ */}
      <section className="relative min-h-[150px] flex flex-col overflow-hidden">
        {/* Static background — never changes */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1400&q=80"
            alt="background"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        </div>

        {/* Navbar */}
        <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 py-5">
          <span className="text-white font-bold text-xl tracking-tight"></span>
          <div className="flex items-center gap-4 text-white">
            {/* Circular profile avatar */}
            <button
              onClick={handleOpenProfile}
              className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-white/40 hover:border-white/90 hover:scale-105 transition-all shadow-lg focus:outline-none"
            >
              {(profileImagePreview || currentUser?.profilePicture) ? (
                <img
                  src={profileImagePreview || currentUser?.profilePicture}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-orange-500/80 flex items-center justify-center">
                  <User size={18} className="text-white" />
                </div>
              )}
            </button>
          </div>
        </nav>

        {/* Hero text */}
        <div className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-12 pb-24 pt-4">
          <h1 className="text-white font-extrabold text-4xl md:text-5xl leading-tight max-w-sm mb-3">
            The car is waiting for you
          </h1>
          <a href="#fleet" className="text-white/80 text-sm flex items-center gap-1 hover:text-white transition-colors">
            More information →
          </a>
        </div>

        {/* ── SEARCH FORM ── */}
        
      </section>

      {/* ══════════════════════════════════════════════════════
          FLEET SECTION
      ══════════════════════════════════════════════════════ */}
      <section id="fleet" className="pt-20 pb-16 px-4 md:px-12 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">Our Fleet</h2>
          <div className="flex items-center gap-3">
            {isAdmin && (
              <button
                onClick={handleAddCar}
                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all duration-200 shadow-md shadow-orange-100 active:scale-95"
              >
                <Plus size={15} />
                Add Car
              </button>
            )}
            <button ref={prevRef} className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-orange-400 hover:text-orange-500 transition-all duration-200 bg-white shadow-sm">
              <ChevronLeft size={18} />
            </button>
            <button ref={nextRef} className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-orange-400 hover:text-orange-500 transition-all duration-200 bg-white shadow-sm">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* ── Admin filters ── */}
        {isAdmin && (
          <div className="mb-6 space-y-3">
            {/* Search bar */}
            <div className="relative max-w-md">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by car name or owner username…"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setSelectedUserId(null); }}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent shadow-sm transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >✕</button>
              )}
            </div>

            {/* User pills */}
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mr-1">Filter by owner:</span>
              <button
                onClick={() => { setSelectedUserId(null); setSearchQuery(""); }}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                  selectedUserId === null && !searchQuery
                    ? "bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-100"
                    : "bg-white text-gray-600 border-gray-200 hover:border-orange-300 hover:text-orange-500"
                }`}
              >
                All
              </button>
              {users.map((u) => (
                <button
                  key={u.id}
                  onClick={() => { setSelectedUserId(u.id); setSearchQuery(""); }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                    selectedUserId === u.id
                      ? "bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-100"
                      : "bg-white text-gray-600 border-gray-200 hover:border-orange-300 hover:text-orange-500"
                  }`}
                >
                  {u.profilePicture ? (
                    <img src={u.profilePicture} alt="" className="w-4 h-4 rounded-full object-cover" />
                  ) : (
                    <div className="w-4 h-4 rounded-full bg-orange-200 flex items-center justify-center">
                      <User size={9} className="text-orange-600" />
                    </div>
                  )}
                  {u.username}
                </button>
              ))}
            </div>

            {/* Active filter badge */}
            {(searchQuery || selectedUserId) && (
              <p className="text-xs text-gray-400">
                Showing{" "}
                <span className="font-semibold text-orange-500">
                  {(() => {
                    const q = searchQuery.toLowerCase();
                    return cars.filter((c) =>
                      selectedUserId
                        ? c.owner?.id === selectedUserId
                        : c.name?.toLowerCase().includes(q) || c.owner?.username?.toLowerCase().includes(q)
                    ).length;
                  })()}
                </span>{" "}
                car(s)
                {searchQuery && <> matching "<span className="font-medium text-gray-600">{searchQuery}</span>"</>}
                {selectedUserId && <> owned by "<span className="font-medium text-gray-600">{users.find(u => u.id === selectedUserId)?.username}</span>"</>}
              </p>
            )}
          </div>
        )}

        {/* Swiper */}
        {(() => {
          const q = searchQuery.toLowerCase();
          const filteredCars = isAdmin
            ? cars.filter((c) =>
                selectedUserId
                  ? c.owner?.id === selectedUserId
                  : !searchQuery || c.name?.toLowerCase().includes(q) || c.owner?.username?.toLowerCase().includes(q)
              )
            : cars;

          return filteredCars.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-gray-400">
              <Car size={40} className="mb-3 opacity-30" />
              <p className="font-medium">No cars found</p>
              <p className="text-sm mt-1">Try a different search or filter</p>
            </div>
          ) : (
            <Swiper
              modules={[Autoplay, Navigation]}
              spaceBetween={20}
              slidesPerView={1}
              navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
              onBeforeInit={(swiper) => {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
              }}
              autoplay={filteredCars.length > 1 ? { delay: 3000, disableOnInteraction: false } : false}
              loop={filteredCars.length > 4}
              breakpoints={{
                480: { slidesPerView: 1.4 },
                640: { slidesPerView: 2 },
                900: { slidesPerView: 2.5 },
                1100: { slidesPerView: 3 },
                1280: { slidesPerView: 3.2 },
              }}
              className="pb-4"
              key={`${searchQuery}-${selectedUserId}`}
            >
              {filteredCars.map((car) => (
                <SwiperSlide key={car.id}>
                  <CarCard
                    car={car}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onToggleAvailability={handleToggleAvailability}
                    isAdmin={isAdmin}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          );
        })()}
      </section>

      {/* ══════════════════════════════════════════════════════
          ADVANTAGES SECTION
      ══════════════════════════════════════════════════════ */}
      <section className="py-16 px-4 md:px-12 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 text-center mb-10">
            Advantages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {advantages.map((adv) => (
              <AdvantageCard key={adv.id} {...adv} />
            ))}
          </div>
        </div>
      </section>



      <AnimatePresence>
      {showCarModal && (
        <motion.div
          key="car-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="bg-white rounded-2xl p-5 sm:p-8 w-full max-w-xl shadow-2xl mx-4 max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-2xl font-bold mb-6">
              {editingCar ? "Edit Car" : "Add New Car"}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <input
                placeholder="Car Name"
                value={carForm.name}
                onChange={(e) =>
                  setCarForm({ ...carForm, name: e.target.value })
                }
                className="border p-3 rounded-xl"
              />

              <input
                placeholder="Category"
                value={carForm.category}
                onChange={(e) =>
                  setCarForm({ ...carForm, category: e.target.value })
                }
                className="border p-3 rounded-xl"
              />

              <input
                placeholder="Price"
                type="number"
                value={carForm.price}
                onChange={(e) =>
                  setCarForm({ ...carForm, price: e.target.value })
                }
                className="border p-3 rounded-xl"
              />

              <input
                placeholder="Engine"
                value={carForm.engine}
                onChange={(e) =>
                  setCarForm({ ...carForm, engine: e.target.value })
                }
                className="border p-3 rounded-xl"
              />

              <input
                placeholder="Transmission"
                value={carForm.transmission}
                onChange={(e) =>
                  setCarForm({ ...carForm, transmission: e.target.value })
                }
                className="border p-3 rounded-xl"
              />

              <select
                value={carForm.userId}
                onChange={(e) =>
                  setCarForm({ ...carForm, userId: e.target.value })
                }
                className="border p-3 rounded-xl"
              >
                <option value="">Select Owner</option>
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.username}
                  </option>
                ))}
              </select>

            </div>

            {/* Car Image Upload */}
            <div className="mt-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Car Image</label>
              <label className="cursor-pointer group relative block">
                <div className={`w-full h-40 rounded-2xl border-2 border-dashed overflow-hidden flex items-center justify-center transition-all
                  ${carImagePreview ? "border-orange-300 bg-orange-50" : "border-gray-200 bg-gray-50 hover:border-orange-400 hover:bg-orange-50"}`}>
                  {carImagePreview ? (
                    <img src={carImagePreview} alt="preview" className="w-full h-full object-cover rounded-2xl" />
                  ) : (
                    <div className="text-center">
                      <div className="text-4xl mb-2">🚗</div>
                      <p className="text-sm text-gray-400 font-medium">Click to upload car image</p>
                      <p className="text-xs text-gray-300 mt-1">PNG, JPG, WEBP supported</p>
                    </div>
                  )}
                  {/* overlay on hover when image exists */}
                  {carImagePreview && (
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">📷 Change Image</span>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    setCarImageFile(file);
                    setCarImagePreview(URL.createObjectURL(file));
                  }}
                />
              </label>
            </div>

            {/* Availability Switch */}
            <div className="flex items-center justify-between mt-6">
              <span className="font-medium">Available</span>

              <button
                onClick={() =>
                  setCarForm({
                    ...carForm,
                    available: !carForm.available,
                  })
                }
                className={`w-14 h-8 rounded-full transition ${
                  carForm.available
                    ? "bg-green-500"
                    : "bg-gray-300"
                }`}
              >
                <div
                  className={`w-6 h-6 bg-white rounded-full shadow transform transition m-1 ${
                    carForm.available
                      ? "translate-x-6"
                      : ""
                  }`}
                />
              </button>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={() => setShowCarModal(false)}
                className="px-5 py-2 rounded-xl border"
              >
                Cancel
              </button>

              <button
                onClick={handleSaveCar}
                className="px-5 py-2 rounded-xl bg-orange-500 text-white"
              >
                {editingCar ? "Update" : "Create"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>


      {/* ══════════════════════════════════════════════════════
          PROFILE MODAL
      ══════════════════════════════════════════════════════ */}
      <AnimatePresence>
      {showProfileModal && (
        <motion.div
          key="profile-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowProfileModal(false)}
          />

          {/* Modal card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md mx-4 overflow-hidden max-h-[90vh] overflow-y-auto"
          >

            {/* Top gradient banner */}
            <div className="h-28 bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500 relative">
              <div className="absolute inset-0 opacity-20"
                style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "30px 30px" }}
              />
              <button
                onClick={() => setShowProfileModal(false)}
                className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/20 hover:bg-white/30 rounded-full w-8 h-8 flex items-center justify-center transition-all"
              >
                ✕
              </button>
            </div>

            {/* Avatar */}
            <div className="flex justify-center -mt-14 relative z-10">
              <label className="cursor-pointer group relative">
                <div className="w-28 h-28 rounded-full border-4 border-white shadow-xl overflow-hidden bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                  {profileImagePreview ? (
                    <img src={profileImagePreview} alt="avatar" className="w-full h-full object-cover" />
                  ) : (
                    <User size={48} className="text-orange-400" />
                  )}
                </div>
                {/* Camera overlay */}
                <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-2xl">📷</span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleProfileImageChange}
                />
              </label>
            </div>

            {/* Form body */}
            <div className="px-8 pb-8 pt-4">
              <h2 className="text-center text-xl font-bold text-gray-900 mb-1">
                Edit Profile
              </h2>
              <p className="text-center text-sm text-gray-400 mb-6">
                Click on your photo to change it
              </p>

              {/* Username field */}
              <div className="mb-5">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Username
                </label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={profileForm.username}
                    onChange={(e) => setProfileForm({ ...profileForm, username: e.target.value })}
                    placeholder="Your username"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all bg-gray-50"
                  />
                </div>
              </div>

              {/* Email (read-only) */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email <span className="text-gray-400 font-normal">(read-only)</span>
                </label>
                <input
                  type="email"
                  value={currentUser?.email || ""}
                  readOnly
                  className="w-full px-4 py-3 border border-gray-100 rounded-xl text-sm bg-gray-100 text-gray-400 cursor-not-allowed"
                />
              </div>

              {/* Success message */}
              {profileSuccess && (
                <div className="mb-4 flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 text-sm font-medium">
                  <span>✓</span> Profile updated successfully!
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowProfileModal(false)}
                  className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveProfile}
                  disabled={profileSaving}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm font-semibold hover:from-orange-600 hover:to-amber-600 transition-all shadow-md shadow-orange-100 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {profileSaving ? (
                    <>
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                      </svg>
                      Saving…
                    </>
                  ) : "Save Changes"}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>


      {/* ══════════════════════════════════════════════════════
          TESTIMONIALS TEASER
      ══════════════════════════════════════════════════════ */}
      <section className="py-14 px-4 md:px-12 max-w-5xl mx-auto text-center">
        <p className="text-gray-400 text-sm font-semibold tracking-widest uppercase mb-1">
          What
        </p>
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
          They Say <span className="font-light">About Us</span>
        </h2>
      </section>
    </div>


  );
}

