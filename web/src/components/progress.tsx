import axios from "axios";
import { useEffect } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';

function Progress() {
    const score = 100

    const calcColor = (percent: any, start: any, end: any) => {
        let a = percent / 100
        let b = (end - start) * a
        let c = b + start;

        return "hsl(" + c + ", 100%, 50%)";
    }

    

    return (
        <CircularProgressbar
            value={score}
            text={`${score} %`}
            circleRatio={1}
            styles={{
                trail: {
                    strokeLinecap: 'butt',
                    transform: 'rotate(-180deg)',
                    transformOrigin: 'center center',
                },
                path: {
                    strokeLinecap: 'butt',
                    transform: 'rotate(-180deg)',
                    transformOrigin: 'center center',
                    stroke: calcColor(score, 0, 120),
                },
                text: {
                    fill: '#ddd'
                },
            }}
            strokeWidth={7}
        />
    );
}

export default Progress;