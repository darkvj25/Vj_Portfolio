import React, { useState } from 'react';
import { X, ShoppingBag, CreditCard, DollarSign, CheckCircle, RefreshCw, Printer, ShieldCheck, Zap, ArrowRight, Trash2 } from 'lucide-react';

export default function PosSimulatorModal({ isOpen, onClose, onShowToast }) {
  const INITIAL_PRODUCTS = [
    { id: 'p1', name: 'Iced Spanish Latte', category: 'Beverage', price: 145.0, icon: '☕' },
    { id: 'p2', name: 'Caramel Macchiato', category: 'Beverage', price: 155.0, icon: '🥤' },
    { id: 'p3', name: 'Retail POS Barcode Item', category: 'Retail', price: 380.0, icon: '📦' },
    { id: 'p4', name: 'Pensions Room Allocation', category: 'Hospitality', price: 1250.0, icon: '🏨' },
    { id: 'p5', name: 'Equipment Lease Unit', category: 'Government', price: 500.0, icon: '🚜' },
    { id: 'p6', name: 'FinAI Premium Subscription', category: 'AI PWA', price: 299.0, icon: '⚡' },
  ];

  const [cart, setCart] = useState([
    { id: 'p1', name: 'Iced Spanish Latte', price: 145.0, qty: 2 },
    { id: 'p3', name: 'Retail POS Barcode Item', price: 380.0, qty: 1 },
  ]);

  const [paymentMethod, setPaymentMethod] = useState('GCASH');
  const [cashTendered, setCashTendered] = useState('1000');
  const [shiftRegister, setShiftRegister] = useState({
    startingFloat: 2000.0,
    totalSales: 670.0,
    transactionCount: 1,
  });

  const [receipt, setReceipt] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  // Calculation
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const vatAmount = subtotal * 0.12;
  const grandTotal = subtotal + vatAmount;
  const changeAmount = paymentMethod === 'CASH' ? Math.max(0, (parseFloat(cashTendered) || 0) - grandTotal) : 0;

  const handleAddToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) => (item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, qty: 1 }];
    });
  };

  const handleUpdateQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    if (paymentMethod === 'CASH' && (parseFloat(cashTendered) || 0) < grandTotal) {
      if (onShowToast) onShowToast('⚠️ Insufficient Cash Tendered!');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const txId = 'TX-' + Math.floor(100000 + Math.random() * 900000);
      const newReceipt = {
        txId,
        date: new Date().toLocaleString(),
        items: [...cart],
        subtotal,
        vatAmount,
        grandTotal,
        paymentMethod,
        cashTendered: paymentMethod === 'CASH' ? parseFloat(cashTendered) : grandTotal,
        changeAmount,
        cashier: 'VAN_BENZON_DEV',
      };

      setReceipt(newReceipt);
      setShiftRegister((prev) => ({
        ...prev,
        totalSales: prev.totalSales + grandTotal,
        transactionCount: prev.transactionCount + 1,
      }));

      setIsProcessing(false);
      if (onShowToast) onShowToast(`✓ Checkout Complete! Ref #${txId}`);
    }, 600);
  };

  const handleCopyReceipt = () => {
    if (!receipt) return;
    const receiptText = `=== PENSION & RETAIL POS RECEIPT ===
Tx ID: ${receipt.txId}
Date: ${receipt.date}
Cashier: ${receipt.cashier}
-----------------------------------
${receipt.items.map((i) => `${i.qty}x ${i.name} @ ₱${i.price.toFixed(2)} = ₱${(i.qty * i.price).toFixed(2)}`).join('\n')}
-----------------------------------
Subtotal: ₱${receipt.subtotal.toFixed(2)}
12% VAT: ₱${receipt.vatAmount.toFixed(2)}
GRAND TOTAL: ₱${receipt.grandTotal.toFixed(2)}
Payment (${receipt.paymentMethod}): ₱${receipt.cashier ? receipt.cashTendered.toFixed(2) : '0.00'}
Change: ₱${receipt.changeAmount.toFixed(2)}
=== SHIFT RECONCILED BY BENZON ===`;

    navigator.clipboard.writeText(receiptText);
    if (onShowToast) onShowToast('📋 POS Thermal Receipt copied to clipboard!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian/90 backdrop-blur-md p-2 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-slate-950 border border-cyan-500/40 rounded-xl shadow-[0_0_50px_rgba(6,182,212,0.3)] flex flex-col max-h-[90vh] overflow-hidden text-ivory">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-cyan-500/30">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded bg-cyan-500/20 border border-cyan-400">
              <Zap className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <h3 className="font-cinzel text-sm sm:text-base font-bold text-cyan-400 tracking-wider uppercase">
                ENTERPRISE POS & SHIFT RECONCILIATION SIMULATOR
              </h3>
              <p className="text-[10px] text-muted-gray font-mono">
                ENGINEERED BY VAN JASPER BENZON // PHP & MYSQL TRANSACTION LOGIC
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-800 text-gray-400 hover:text-cyan-400 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Shift Live Statistics Banner */}
        <div className="grid grid-cols-3 gap-2 px-4 py-2 bg-slate-900/80 border-b border-white/10 text-center font-mono text-[10px] sm:text-xs">
          <div className="p-1.5 rounded bg-slate-950 border border-cyan-500/20">
            <span className="text-muted-gray uppercase block text-[9px]">SHIFT DRAWER FLOAT</span>
            <span className="text-cyan-400 font-bold">₱{shiftRegister.startingFloat.toFixed(2)}</span>
          </div>
          <div className="p-1.5 rounded bg-slate-950 border border-emerald-500/20">
            <span className="text-muted-gray uppercase block text-[9px]">SHIFT TOTAL SALES</span>
            <span className="text-emerald-400 font-bold">₱{shiftRegister.totalSales.toFixed(2)}</span>
          </div>
          <div className="p-1.5 rounded bg-slate-950 border border-sky-500/20">
            <span className="text-muted-gray uppercase block text-[9px]">COMPLETED TRANSACTIONS</span>
            <span className="text-sky-300 font-bold">{shiftRegister.transactionCount} RECONCILED</span>
          </div>
        </div>

        {/* Main Grid: Products, Cart, & Digital Receipt */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-5 grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left Column: Product Selection Grid (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-cinzel font-bold tracking-widest text-cyan-400 uppercase">
                1. SELECT ITEMS FOR TRANSACTION
              </span>
              <span className="text-[10px] font-mono text-muted-gray">REAL-TIME INVENTORY CHECK</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {INITIAL_PRODUCTS.map((prod) => (
                <button
                  key={prod.id}
                  onClick={() => handleAddToCart(prod)}
                  className="p-3 bg-slate-900/90 border border-cyan-500/30 rounded-lg hover:border-cyan-400 hover:bg-cyan-500/10 transition-all flex flex-col justify-between text-left group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xl">{prod.icon}</span>
                    <span className="text-[9px] font-mono text-cyan-400 bg-cyan-950 px-1.5 py-0.5 rounded border border-cyan-500/30">
                      {prod.category}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-ivory group-hover:text-cyan-300 transition-colors line-clamp-1">
                      {prod.name}
                    </p>
                    <p className="text-xs font-mono font-bold text-emerald-400 mt-1">
                      ₱{prod.price.toFixed(2)}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {/* Payment Method Selector */}
            <div className="pt-2 border-t border-white/10 space-y-2">
              <span className="text-xs font-cinzel font-bold tracking-widest text-cyan-400 uppercase block">
                2. SELECT PAYMENT GATEWAY
              </span>
              <div className="grid grid-cols-3 gap-2">
                {['CASH', 'GCASH', 'MAYA'].map((method) => (
                  <button
                    key={method}
                    onClick={() => setPaymentMethod(method)}
                    className={`py-2 px-3 rounded text-xs font-mono font-bold tracking-wider uppercase border transition-all ${
                      paymentMethod === method
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-cyan-glow'
                        : 'bg-slate-900 border-white/10 text-muted-gray hover:border-white/30'
                    }`}
                  >
                    {method === 'CASH' && '💵 CASH'}
                    {method === 'GCASH' && '💙 GCASH'}
                    {method === 'MAYA' && '💚 MAYA'}
                  </button>
                ))}
              </div>

              {paymentMethod === 'CASH' && (
                <div className="flex items-center space-x-2 pt-2">
                  <span className="text-xs font-mono text-muted-gray">CASH TENDERED:</span>
                  <input
                    type="number"
                    value={cashTendered}
                    onChange={(e) => setCashTendered(e.target.value)}
                    className="bg-slate-900 border border-cyan-500/40 rounded px-2.5 py-1 text-xs font-mono text-emerald-300 w-32 focus:outline-none focus:border-cyan-400"
                  />
                  <span className="text-xs font-mono text-muted-gray">
                    CHANGE: <span className="text-amber-300 font-bold">₱{changeAmount.toFixed(2)}</span>
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Order Cart & Printable Receipt (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-slate-900/90 rounded-lg p-4 border border-cyan-500/30 font-mono text-xs">
            {receipt ? (
              /* Receipt Generated View */
              <div className="flex-1 flex flex-col justify-between space-y-3">
                <div className="bg-slate-950 p-4 rounded border border-emerald-500/40 font-mono text-[11px] text-slate-300 space-y-2 shadow-inner">
                  <div className="text-center border-b border-dashed border-slate-700 pb-2">
                    <p className="font-bold text-emerald-400 uppercase tracking-widest text-xs">
                      PENSION & RETAIL POS
                    </p>
                    <p className="text-[9px] text-slate-400">BENZON DIGITAL SYSTEM ARCHITECTURE</p>
                    <p className="text-[9px] text-slate-400">REF: {receipt.txId} // {receipt.date}</p>
                  </div>

                  <div className="space-y-1 py-1 max-h-36 overflow-y-auto">
                    {receipt.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between">
                        <span>
                          {item.qty}x {item.name}
                        </span>
                        <span>₱{(item.qty * item.price).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-dashed border-slate-700 pt-2 space-y-1 text-[10px]">
                    <div className="flex justify-between">
                      <span>SUBTOTAL</span>
                      <span>₱{receipt.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>12% VAT INCLUDED</span>
                      <span>₱{receipt.vatAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-emerald-400 text-xs pt-1 border-t border-slate-800">
                      <span>TOTAL PAID ({receipt.paymentMethod})</span>
                      <span>₱{receipt.grandTotal.toFixed(2)}</span>
                    </div>
                    {receipt.paymentMethod === 'CASH' && (
                      <div className="flex justify-between text-amber-300">
                        <span>CHANGE</span>
                        <span>₱{receipt.changeAmount.toFixed(2)}</span>
                      </div>
                    )}
                  </div>

                  <div className="text-center pt-2 border-t border-dashed border-slate-700 text-[9px] text-slate-400">
                    <p>TRANSACTION RECONCILED IN MYSQL</p>
                    <p className="text-emerald-400 font-bold mt-0.5">✓ STATUS: AUDITED & PAID</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleCopyReceipt}
                    className="flex-1 py-2 rounded bg-slate-800 border border-cyan-500/40 text-cyan-300 font-bold hover:bg-cyan-500/20 transition-all flex items-center justify-center space-x-1.5"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>COPY RECEIPT</span>
                  </button>

                  <button
                    onClick={() => setReceipt(null)}
                    className="py-2 px-3 rounded bg-emerald-500/20 border border-emerald-400 text-emerald-300 font-bold hover:bg-emerald-500/30 transition-all"
                  >
                    NEW SALE
                  </button>
                </div>
              </div>
            ) : (
              /* Active Cart View */
              <div className="flex-1 flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="font-cinzel font-bold text-cyan-400 uppercase flex items-center">
                    <ShoppingBag className="w-3.5 h-3.5 mr-1.5 text-cyan-400" />
                    CURRENT ORDER BASKET
                  </span>
                  {cart.length > 0 && (
                    <button
                      onClick={handleClearCart}
                      className="text-[10px] text-rose-400 hover:text-rose-300 flex items-center"
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      CLEAR
                    </button>
                  )}
                </div>

                {/* Items List */}
                <div className="flex-1 overflow-y-auto space-y-2 max-h-48 pr-1">
                  {cart.length === 0 ? (
                    <p className="text-center py-8 text-muted-gray italic">No items added yet. Select items from the left grid.</p>
                  ) : (
                    cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-2 bg-slate-950 rounded border border-white/5"
                      >
                        <div className="flex-1 pr-2">
                          <p className="font-bold text-ivory text-[11px] truncate">{item.name}</p>
                          <p className="text-[10px] text-cyan-400">₱{item.price.toFixed(2)} each</p>
                        </div>
                        <div className="flex items-center space-x-1.5">
                          <button
                            onClick={() => handleUpdateQty(item.id, -1)}
                            className="w-5 h-5 rounded bg-slate-800 text-white font-bold hover:bg-slate-700"
                          >
                            -
                          </button>
                          <span className="font-bold text-white px-1 text-xs">{item.qty}</span>
                          <button
                            onClick={() => handleUpdateQty(item.id, 1)}
                            className="w-5 h-5 rounded bg-slate-800 text-white font-bold hover:bg-slate-700"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Totals */}
                <div className="border-t border-white/10 pt-2 space-y-1 text-xs">
                  <div className="flex justify-between text-muted-gray">
                    <span>SUBTOTAL</span>
                    <span>₱{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-gray">
                    <span>12% VAT</span>
                    <span>₱{vatAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-emerald-400 pt-1 border-t border-white/10">
                    <span>GRAND TOTAL</span>
                    <span>₱{grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout Action Button */}
                <button
                  disabled={cart.length === 0 || isProcessing}
                  onClick={handleCheckout}
                  className="w-full py-3 rounded bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-500 text-obsidian font-cinzel font-bold text-xs tracking-wider uppercase hover:brightness-110 transition-all shadow-cyan-glow flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-obsidian" />
                      <span>RECONCILING SHIFT...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 text-obsidian" />
                      <span>PROCESS & AUDIT CHECKOUT</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
