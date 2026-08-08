import "./MockBadgeComponent.css";
import { isMockMode } from "../mock.ts";

const MockBadgeComponent = () => {
  if (!isMockMode()) {
    return null;
  }

  return <div className="mockBadge">Mock mode</div>;
};

export default MockBadgeComponent;
