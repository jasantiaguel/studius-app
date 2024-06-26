import GroupInfo from "@/components/GroupInfo";
import Tag from "@/components/Tag";
import { useState } from "react";
import styles from "./GroupCard.module.css";
import { AnimatePresence, motion } from "framer-motion";

export default function Card({group, todo=null, returnGroup=null, selectedTags=[], tabIndex=0}) {
    const [popup, setPopup] = useState(false);
    const TAGLIMIT = 35;

    function processTags(arr) {
        let temp = [...arr];
        if (arr.toString().length > TAGLIMIT) {
            temp.unshift("...");
        }
        return temp;
    }

    let statusObject = getStatus(group.time);
    let status = statusObject.status;
    let startsWithin24Hours = statusObject.startsWithin24Hours;

    const handleButton = () => {
        setPopup(false);
        todo && todo();
    }

    const returnData = (data) => {
        returnGroup && returnGroup(data);
    }

    function dateParser(dayNum) {
        switch (dayNum) {
            case 1: return "Monday"
            case 2: return "Tuesday"
            case 3: return "Wednesday"
            case 4: return "Thursday"
            case 5: return "Friday"
            case 6: return "Saturday"
            case 0: return "Sunday"
        }
    }

    function timeParser(hours, minutes) {
        let meridiem = "AM";
        if (hours >= 12) meridiem = "PM";
        if (hours > 12) hours -= 12;
        if (hours.length < 2) hours = '0'+hours;
        if (minutes.length < 2) minutes = '0'+minutes;
        return `${hours}:${minutes}${meridiem}`
    }

    function getStatus(date) {
        let now = new Date();
        let difference = date.getTime() - now.getTime();
        if (difference < 0) {
            return { status: "In Progress", startsWithin24Hours: true };
        }
        let hours = Math.round((Math.floor(difference/10000)*10)/60/60);
        if (hours > 23) {
            let days = Math.floor(hours / 24);
            return { status: `Starts in ${days} day${days > 1 ? 's':''}`, startsWithin24Hours: false };
        }
        return { status: `Starting in ${hours} hour${hours > 1 ? 's':''}`, startsWithin24Hours: true };
    }

    let day = dateParser(group.time.getDay());
    let time = timeParser(''+group.time.getHours(), ''+group.time.getMinutes());
    
    return(
        <>
        <motion.div
        // key="card"
        initial={{x: 40}}
        animate={{x: 0}}
        whileHover={{scale: 1.02}}
        whileTap={{scale: 0.98}}
        className={styles.all}>
            <div 
                className={startsWithin24Hours ? styles.active : styles.inactive} 
                onClick={() => setPopup(true)}
                tabIndex={tabIndex}
            >
                <div className={styles.top}>
                    <div>
                        <h3 className={styles.title}>{group.title}</h3>
                        <p className={styles.status}>{status}</p>
                    </div>
                    <div 
                      className={styles.timeBlock} 
                      style={startsWithin24Hours ?
                      {backgroundColor: "var(--bright-af-75)", color: "var(--dark-green"} : 
                      {backgroundColor: "var(--med-green-85)", color: "white"}
                      }
                    >
                      <p style={{fontWeight: "var(--font-weight-bold)"}}>{day}</p>
                      <p>{time}</p>
                    </div>
                </div>  
                <div className={styles.tags}>
                    {
                        processTags(group.tags).map((tag) => {
                            return(
                                <Tag 
                                    text={tag} 
                                    type={
                                        startsWithin24Hours ? (selectedTags.includes(tag) 
                                        ? 'selected' : 'tag') : (selectedTags.includes(tag) 
                                        ? 'selectedSched' : 'tag')
                                    }
                                />
                            )
                        })
                    }
                </div>
            </div>
            <div className={styles.footer}>
                <p style={{fontWeight: "var(--font-weight-bold)", margin: "0"}}>{group.location}</p>
                <div className={styles.icons}>
                    {
                        group.members.map((member) => {
                            return <div 
                                        style={{
                                        backgroundImage: member == "" ? "url('/images/icon.profile-unfilled-small.svg')":"url('/images/icon.profile-filled-small.svg')", 
                                        backgroundPosition: "center",
                                        width: "28px", 
                                        height: "28px", 
                                        borderRadius: "32px"
                                        }}>
                                    </div>
                        })
                    }
                </div>
            </div>
        </motion.div>
        <AnimatePresence>
        {
            popup && <GroupInfo group={group} todo={handleButton} returnGroup={returnData} onclick={() => setPopup(false)} day={day} time={time}/>
        }
        </AnimatePresence>
        </>
    )
}