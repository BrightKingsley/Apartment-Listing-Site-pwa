import { IoClose,  } from "react-icons/io5";
import classes from "./Panel.module.css";
import "./panelAnimation.css";
import { AnimatePresence, motion } from "framer-motion";

const Panel = ({ children, showPanel, hidePanel }) => {
  const hide = () => {
    hidePanel();
  };

  return (
    <AnimatePresence>
      {showPanel && (
        <motion.div
          initial={{ translateX: "100%" }}
          animate={{ translateX: 0}}
          exit={{ translateX: "100%" }}
          className={classes.panel}
        >
          <span className={classes.exit} onClick={hide}>
            <IoClose />
          </span>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Panel;
