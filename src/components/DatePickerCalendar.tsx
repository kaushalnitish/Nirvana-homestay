import React, { useState, useRef, useEffect } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, X } from "lucide-react";

interface DateRange {
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
}

interface DatePickerCalendarProps {
  startDate: string;
  endDate: string;
  onChange: (start: string, end: string) => void;
  minDate?: string;
  placeholderStart?: string;
  placeholderEnd?: string;
}

export default function DatePickerCalendar({
  startDate,
  endDate,
  onChange,
  minDate,
  placeholderStart = "Check-In",
  placeholderEnd = "Check-Out"
}: DatePickerCalendarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calendar navigation state
  const [currentDate, setCurrentDate] = useState(() => {
    const initial = startDate ? new Date(startDate) : new Date();
    return isNaN(initial.getTime()) ? new Date() : initial;
  });

  const [hoveredDate, setHoveredDate] = useState<string | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Handle click outside to close popover
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  // Helper date parsing/formatting
  const formatDateString = (y: number, m: number, d: number) => {
    const mm = String(m + 1).padStart(2, "0");
    const dd = String(d).padStart(2, "0");
    return `${y}-${mm}-${dd}`;
  };

  const getDaysInMonth = (y: number, m: number) => {
    return new Date(y, m + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (y: number, m: number) => {
    return new Date(y, m, 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleDateClick = (dateStr: string) => {
    if (!startDate || (startDate && endDate)) {
      // First click or reset: set as start date
      onChange(dateStr, "");
    } else {
      // Second click: handle check-out
      if (new Date(dateStr) < new Date(startDate)) {
        // If clicked date is earlier than start, reset start to this date
        onChange(dateStr, "");
      } else {
        // Set as end date
        onChange(startDate, dateStr);
        setIsOpen(false); // Auto-close when fully selected
      }
    }
  };

  const isSelectedStart = (dateStr: string) => startDate === dateStr;
  const isSelectedEnd = (dateStr: string) => endDate === dateStr;

  const isInRange = (dateStr: string) => {
    if (!startDate || !endDate) return false;
    const d = new Date(dateStr);
    return d > new Date(startDate) && d < new Date(endDate);
  };

  const isHoveredRange = (dateStr: string) => {
    if (!startDate || endDate || !hoveredDate) return false;
    const d = new Date(dateStr);
    const start = new Date(startDate);
    const hover = new Date(hoveredDate);
    if (hover < start) return false;
    return d > start && d <= hover;
  };

  const isDateDisabled = (dateStr: string) => {
    const d = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // If there is a minimum date specified, use that
    if (minDate) {
      return d < new Date(minDate);
    }
    // Otherwise disable past dates
    return d < today;
  };

  // Generate calendar days grid
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayIndex = getFirstDayOfMonth(year, month);

  // Prev month's trailing days for padding
  const prevMonthIndex = month === 0 ? 11 : month - 1;
  const prevYear = month === 0 ? year - 1 : year;
  const daysInPrevMonth = getDaysInMonth(prevYear, prevMonthIndex);

  const calendarCells = [];

  // Trailing days of previous month
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    const d = daysInPrevMonth - i;
    const dateStr = formatDateString(prevYear, prevMonthIndex, d);
    calendarCells.push({
      day: d,
      dateStr,
      isCurrentMonth: false,
      isDisabled: isDateDisabled(dateStr)
    });
  }

  // Days of current month
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = formatDateString(year, month, d);
    calendarCells.push({
      day: d,
      dateStr,
      isCurrentMonth: true,
      isDisabled: isDateDisabled(dateStr)
    });
  }

  // Next month's leading days
  const remainingCells = 42 - calendarCells.length; // 6 rows standard
  const nextMonthIndex = month === 11 ? 0 : month + 1;
  const nextYear = month === 11 ? year + 1 : year;
  for (let d = 1; d <= remainingCells; d++) {
    const dateStr = formatDateString(nextYear, nextMonthIndex, d);
    calendarCells.push({
      day: d,
      dateStr,
      isCurrentMonth: false,
      isDisabled: isDateDisabled(dateStr)
    });
  }

  // Format dates for display on inputs
  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "";
    return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange("", "");
  };

  return (
    <div ref={containerRef} className="relative w-full text-left" id="custom-datepicker-container">
      {/* Visual Input Fields */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="grid grid-cols-2 gap-px bg-brand-border/60 border border-brand-border rounded-xl overflow-hidden cursor-pointer bg-brand-bg/30 hover:border-brand-green/40 transition-colors"
      >
        <div className="p-3 pl-10 relative flex flex-col justify-center min-h-[52px]">
          <CalendarIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-text-sec" />
          <span className="text-[9px] uppercase tracking-wider text-brand-text-sec font-semibold block leading-none">
            {placeholderStart}
          </span>
          <span className="text-xs text-brand-text font-medium mt-1 block h-4">
            {formatDisplayDate(startDate) || "Choose Date"}
          </span>
        </div>

        <div className="p-3 pl-5 relative flex flex-col justify-center border-l border-brand-border/60 min-h-[52px]">
          <span className="text-[9px] uppercase tracking-wider text-brand-text-sec font-semibold block leading-none">
            {placeholderEnd}
          </span>
          <span className="text-xs text-brand-text font-medium mt-1 block h-4">
            {formatDisplayDate(endDate) || "Choose Date"}
          </span>

          {(startDate || endDate) && (
            <button 
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-brand-border/50 text-brand-text-sec transition-colors"
              title="Clear stay dates"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>
      </div>

      {/* Popover Calendar Grid */}
      {isOpen && (
        <div className="absolute top-[calc(100%+8px)] left-0 right-0 md:w-[320px] bg-white border border-brand-border rounded-2xl shadow-xl z-40 p-4 animate-fade-in">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-1.5 rounded-lg border border-brand-border hover:bg-brand-bg/30 text-brand-text transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-text">
              {monthNames[month]} {year}
            </span>
            <button
              type="button"
              onClick={handleNextMonth}
              className="p-1.5 rounded-lg border border-brand-border hover:bg-brand-bg/30 text-brand-text transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Days of week */}
          <div className="grid grid-cols-7 gap-y-1 text-center mb-1">
            {daysOfWeek.map((day) => (
              <span key={day} className="text-[10px] font-bold text-brand-text-sec uppercase">
                {day}
              </span>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-y-1 text-center">
            {calendarCells.map((cell, idx) => {
              const start = isSelectedStart(cell.dateStr);
              const end = isSelectedEnd(cell.dateStr);
              const range = isInRange(cell.dateStr);
              const hoverRange = isHoveredRange(cell.dateStr);
              
              let cellClass = "text-xs py-1.5 relative focus:outline-none cursor-pointer select-none transition-all duration-150 rounded-lg ";
              
              if (cell.isDisabled) {
                cellClass += "text-brand-text-sec/20 pointer-events-none ";
              } else if (!cell.isCurrentMonth) {
                cellClass += "text-brand-text-sec/40 ";
              } else {
                cellClass += "text-brand-text ";
              }

              if (start || end) {
                cellClass += "bg-brand-green text-white font-semibold shadow-xs scale-102 z-10 ";
              } else if (range) {
                cellClass += "bg-brand-green/10 text-brand-green font-medium rounded-none ";
              } else if (hoverRange) {
                cellClass += "bg-brand-green/5 text-brand-green font-medium rounded-none ";
              } else if (!cell.isDisabled) {
                cellClass += "hover:bg-brand-bg/40 ";
              }

              return (
                <div
                  key={idx}
                  onClick={() => !cell.isDisabled && handleDateClick(cell.dateStr)}
                  onMouseEnter={() => !cell.isDisabled && setHoveredDate(cell.dateStr)}
                  onMouseLeave={() => setHoveredDate(null)}
                  className={cellClass}
                >
                  <span className="relative z-10">{cell.day}</span>
                  {/* Visual accent circles for range ends */}
                  {start && (
                    <span className="absolute inset-y-1.5 left-1/2 right-0 bg-brand-green/10 -z-0 rounded-l-none hidden" />
                  )}
                  {end && (
                    <span className="absolute inset-y-1.5 right-1/2 left-0 bg-brand-green/10 -z-0 rounded-r-none hidden" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Status Note */}
          <div className="mt-4 pt-3 border-t border-brand-border/60 flex items-center justify-between text-[10px] text-brand-text-sec">
            <span>
              {!startDate ? "Choose Check-In date" : !endDate ? "Choose Check-Out date" : "Stay range selected!"}
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-brand-green hover:underline font-semibold"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
