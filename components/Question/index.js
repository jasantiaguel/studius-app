import styles from "./Question.module.css";
import { motion } from "framer-motion";

export default function Question({ answerData, onclick, onKeyDown, returnData, style, tabIndex}) {   //answerData is one of the objects in the answers array in the data file quiz.js:
    //                                                                    {text: "Feynman, SQ3R +1", method: ["Feynman", "SQ3R"], value: 1}

    //combines passed onclick function with additional functionality
    const handleClick = () => {
        if (!onclick) return;
        onclick(); //onclick function passed from questions.js (it goes to the next question)
        returnData(answerData); //passes this answer object back to the main file (questions.js)
    }

    
    return (
        <motion.div
        initial={{scale: .9}}
        animate={{scale: 1}}
        whileHover={{scale: 1.05}}
        transition={{type: "spring", duration: .5}}
        tabIndex={tabIndex} className={styles.answerBackground} onClick={handleClick} onKeyDown={(e) => e.key === 'Enter' && handleClick()} style={answerData.number % 2 != 0 ? {marginRight: "auto"} : {marginLeft: "auto"}}>
            <div className={styles.ellipse} style={style}>
                {answerData.number} 
            </div>
            <div className={styles.rectangle}>
                {answerData.text}
            </div>
        </motion.div>
    )
}