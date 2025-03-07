import Link from "next/link";
import "../globals.css";
import { CalendarCheck, Users, Mail, Package } from "lucide-react"; // Import icons

export default function Banner({ title, description, link, color }) {
  // Select an icon based on the title
  const getIcon = (size = 50, opacity = 1, extraClass = "") => {
    const iconProps = { size, className: `icon ${extraClass}`, style: { opacity } };

    switch (title) {
      case "Mark Attendance":
        return <CalendarCheck {...iconProps} />;
      case "Schedule A Meet":
        return <Users {...iconProps} />;
      case "Email Broadcaster":
        return <Mail {...iconProps} />;
      case "Resource Allocator":
        return <Package {...iconProps} />;
      default:
        return null;
    }
  };

  return (
    <Link href={link} className="banner-link">
      <div className="banner" style={{ backgroundColor: color, position: "relative" }}>
        {/* Regular Icon Next to Text */}
        <div className="icon-container">{getIcon(50, 1)}</div>

        {/* Text Content */}
        <div className="text-content">
          <h1>{title}</h1>
          <p>{description}</p>
        </div>

        {/* Large Transparent Background Icon */}
        <div className="large-icon">{getIcon(90, 0.1, "background-icon")}</div>
      </div>
    </Link>
  );
}
