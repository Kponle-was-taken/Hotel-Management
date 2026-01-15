import React, { useCallback, useEffect, useRef, useState } from "react";
import { checkAvailability } from "../utils/availability";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase";

const FOCUSABLE = 'a[href], area[href], input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])';

const BookingModal = ({ open, onClose, onRequest, initialFloor, initialRoom }) => {
  const today = new Date();
  const isoDate = (d) => d.toISOString().slice(0, 10);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    floor: "Celestial Heights",
    checkin: isoDate(today),
    checkout: isoDate(tomorrow),
    guests: 2,
    room: null,
  });

  const [errors, setErrors] = useState({});
  const [avail, setAvail] = useState({ loading: false, available: null, pricePerNight: 0, totalPrice: 0, nights: 0, message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const dialogRef = useRef(null);

  // focus-trap: keep tab within modal
  const onKeyDown = useCallback((e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose && onClose();
      return;
    }
    if (e.key !== "Tab") return;
    const node = dialogRef.current;
    if (!node) return;
    const focusables = Array.from(node.querySelectorAll(FOCUSABLE));
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onKeyDown]);

  useEffect(() => {
    if (!open) return;
    const node = dialogRef.current;
    if (node) {
      const first = node.querySelector("input, select, button, [tabindex]");
      first && first.focus();
    }
  }, [open]);

  // when modal opens with an initialFloor prop, prefill the form.floor
  useEffect(() => {
    if (open) {
      setForm((s) => ({
        ...s,
        floor: initialFloor || s.floor,
        room: initialRoom || null,
      }));
      if (initialFloor) setErrors((s) => ({ ...s, floor: undefined }));
    }
  }, [open, initialFloor, initialRoom]);

  const validate = (values) => {
    const errs = {};
    const { name, email, checkin, checkout, guests } = values;
    if (!name || name.trim().length < 2) errs.name = "Please enter your full name.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) errs.email = "Enter a valid email address.";
    if (!checkin) errs.checkin = "Select a check-in date.";
    if (!checkout) errs.checkout = "Select a check-out date.";
    if (checkin && checkout) {
      const ci = new Date(checkin);
      const co = new Date(checkout);
      if (co <= ci) errs.checkout = "Check-out must be after check-in.";
    }
    if (!guests || Number(guests) < 1) errs.guests = "At least one guest is required.";
    if (guests && Number(guests) > 8) errs.guests = "For groups larger than 8, please contact us.";
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    setErrors((s) => ({ ...s, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validate(form);
    if (Object.keys(validation).length) {
      setErrors(validation);
      const firstKey = Object.keys(validation)[0];
      const el = dialogRef.current && dialogRef.current.querySelector(`[name="${firstKey}"]`);
      el && el.focus();
      return;
    }
    if (avail.available === false) {
      alert("Selected room/dates are unavailable. Please adjust your selection.");
      return;
    }

    setIsSubmitting(true);

      try {
      const docRef = await addDoc(collection(db, "bookings"), {
        ...form,
        pricing: avail,
        createdAt: new Date().toISOString(),
        paymentStatus: "pending",
      });

      const paymentLink = `${window.location.origin}/payment/${docRef.id}`;
      await updateDoc(doc(db, "bookings", docRef.id), { paymentLink });
      
      setIsSubmitting(false);
      setSubmitSuccess(true);

      const payload = { ...form, pricing: avail };
      console.log("Booking requested:", payload);
      if (onRequest) onRequest(payload);
      
    } catch (error) {
      console.error("Error adding booking: ", error);
      setIsSubmitting(false);
      alert("Failed to send booking request. Please try again.");
    }
    // Note: onClose is now handled by the success modal button
  };

  // debounced availability
  useEffect(() => {
    let mounted = true;
    const run = async () => {
      setAvail((s) => ({ ...s, loading: true }));
      try {
        // use floor category for availability checks (string name)
        const result = await checkAvailability({ room: form.floor, checkin: form.checkin, checkout: form.checkout, guests: form.guests });
        if (!mounted) return;
        setAvail({ loading: false, ...result });
      } catch (err) {
        if (!mounted) return;
        setAvail({ loading: false, available: false, message: "Availability check failed" });
      }
    };

    if (form.checkin && form.checkout && new Date(form.checkout) > new Date(form.checkin)) {
      const t = setTimeout(run, 450);
      return () => {
        mounted = false;
        clearTimeout(t);
      };
    }
    setAvail({ loading: false, available: null, pricePerNight: 0, totalPrice: 0, nights: 0, message: "" });
    return () => {
      mounted = false;
    };
  }, [form.floor, form.checkin, form.checkout, form.guests]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" role="dialog" aria-modal="true" aria-label="Booking form">
      <div className="absolute inset-0 bg-black/60" onClick={() => onClose && onClose()} />

      <div ref={dialogRef} className="relative bg-white rounded-lg max-w-lg w-full mx-4 p-6 shadow-2xl overflow-hidden">
        
        {/* Processing Overlay */}
        {isSubmitting && (
          <div className="absolute inset-0 bg-white/95 z-50 flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-emerald-600 mb-4"></div>
            <h3 className="text-xl font-font2 text-mahogany">Processing Booking...</h3>
            <p className="text-gray-500 mt-2">Please wait while we secure your reservation.</p>
          </div>
        )}

        {/* Success Overlay */}
        {submitSuccess && (
          <div className="absolute inset-0 bg-white z-50 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-3xl text-green-600">✓</span>
            </div>
            <h3 className="text-2xl font-font2 text-mahogany mb-2">Request Received!</h3>
            <p className="text-gray-600 mb-6">
              Thank you, {form.name}. We have received your booking request for <strong>{form.floor}</strong>.
              <br /><br />
              A confirmation email has been sent to <strong>{form.email}</strong>.
            </p>
            <button onClick={() => { onClose && onClose(); setSubmitSuccess(false); }} className="px-8 py-3 rounded-md font-semibold text-white transition-colors" style={{ backgroundColor: "var(--emerald)" }}>
              Done
            </button>
          </div>
        )}

        <div className="flex items-start justify-between">
          <h3 className="text-xl font-font2">
            {initialRoom ? `Book: ${initialRoom.name}` : 'Book Your Stay'}
          </h3>
          <button onClick={() => onClose && onClose()} aria-label="Close booking form" className="text-gray-600 hover:text-gray-900">✕</button>
        </div>

        <form className="mt-4" onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <label className="flex flex-col">
              <span className="text-sm text-gray-700">Check-in</span>
              <input
                type="date"
                name="checkin"
                value={form.checkin}
                onChange={(e) => {
                  const newCheckin = e.target.value;
                  const nextDay = new Date(newCheckin);
                  nextDay.setDate(nextDay.getDate() + 1);
                  if (new Date(form.checkout) <= new Date(newCheckin)) {
                    setForm((s) => ({ ...s, checkin: newCheckin, checkout: isoDate(nextDay) }));
                  } else {
                    setForm((s) => ({ ...s, checkin: newCheckin }));
                  }
                }}
                required
                min={isoDate(today)}
                className={`mt-1 p-2 border rounded ${errors.checkin ? 'border-red-500' : ''}`}
              />
              {errors.checkin && <span className="text-red-600 text-sm mt-1">{errors.checkin}</span>}
            </label>

            <label className="flex flex-col">
              <span className="text-sm text-gray-700">Check-out</span>
              <input
                type="date"
                name="checkout"
                value={form.checkout}
                onChange={(e) => setForm((s) => ({ ...s, checkout: e.target.value }))}
                required
                min={isoDate(new Date(new Date(form.checkin).setDate(new Date(form.checkin).getDate() + 1)))}
                className={`mt-1 p-2 border rounded ${errors.checkout ? 'border-red-500' : ''}`}
              />
              {errors.checkout && <span className="text-red-600 text-sm mt-1">{errors.checkout}</span>}
            </label>

            <label className="flex flex-col">
              <span className="text-sm text-gray-700">Guests</span>
              <input
                type="number"
                name="guests"
                min="1"
                max="20"
                value={form.guests}
                onChange={handleChange}
                className={`mt-1 p-2 border rounded ${errors.guests ? 'border-red-500' : ''}`}
              />
              {errors.guests && <span className="text-red-600 text-sm mt-1">{errors.guests}</span>}
            </label>

            <label className="flex flex-col">
              <span className="text-sm text-gray-700">Floor Category</span>
              <select
                name="floor"
                value={form.floor}
                onChange={handleChange}
                className="mt-1 p-2 border rounded"
                disabled={!!initialRoom}
              >
                <option>The Crown Penthouse</option>
                <option>Grand Suites Collection</option>
                <option>Celestial Heights</option>
                <option>Regency Elegance</option>
                <option>Clocktower Chambers</option>
                <option>Heritage Collection</option>
                <option>Manor Rooms</option>
                <option>Garden Retreat</option>
              </select>
            </label>
          </div>

          <div className="mt-4 p-3 rounded bg-gray-50 border" aria-live="polite">
            {avail.loading ? (
              <div className="text-sm text-gray-700">Checking availability…</div>
            ) : avail.available === null ? (
              <div className="text-sm text-gray-700">Enter dates to see availability and pricing.</div>
            ) : avail.available ? (
              <div className="text-sm text-gray-700 flex items-center justify-between">
                <div>
                  <div className="font-semibold">{avail.message}</div>
                  <div className="text-sm text-gray-600">{avail.nights} night(s) — {avail.pricePerNight} USD / night</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">{avail.totalPrice} USD</div>
                  <div className="text-sm text-gray-600">Total</div>
                </div>
              </div>
            ) : (
              <div className="text-sm text-red-600">{avail.message || 'Unavailable'}</div>
            )}
          </div>

          <div className="mt-4 grid grid-cols-1 gap-2">
            <label className="flex flex-col">
              <span className="text-sm text-gray-700">Full name</span>
              <input type="text" name="name" value={form.name} onChange={handleChange} required className={`mt-1 p-2 border rounded ${errors.name ? 'border-red-500' : ''}`} />
              {errors.name && <span className="text-red-600 text-sm mt-1">{errors.name}</span>}
            </label>

            <label className="flex flex-col">
              <span className="text-sm text-gray-700">Email</span>
              <input type="email" name="email" value={form.email} onChange={handleChange} required className={`mt-1 p-2 border rounded ${errors.email ? 'border-red-500' : ''}`} />
              {errors.email && <span className="text-red-600 text-sm mt-1">{errors.email}</span>}
            </label>

            <label className="flex flex-col">
              <span className="text-sm text-gray-700">Phone</span>
              <input type="tel" name="phone" value={form.phone} onChange={handleChange} className="mt-1 p-2 border rounded" />
            </label>
          </div>

          <div className="mt-4 flex justify-between items-center gap-2">
            <div>{Object.keys(errors).length > 0 && <div className="text-red-600 text-sm" role="alert">Please fix the highlighted fields before submitting.</div>}</div>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => onClose && onClose()} className="px-4 py-2 rounded border">Cancel</button>
              <button 
                type="submit" 
                disabled={avail.loading || isSubmitting} 
                className={`px-4 py-2 rounded text-white font-semibold ${avail.available === false ? 'bg-gray-500' : ''} ${avail.loading || isSubmitting ? 'opacity-70 cursor-wait' : ''}`}
                style={avail.available !== false && !avail.loading && !isSubmitting ? { backgroundColor: "var(--emerald)" } : {}}
              >
                {avail.loading ? "Checking..." : isSubmitting ? "Processing..." : "Request Booking"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
