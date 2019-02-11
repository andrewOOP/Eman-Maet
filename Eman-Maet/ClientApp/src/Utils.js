import React from "react";
import "./index.css";

const range = len => {
    const arr = [];
    for (let i = 0; i < len; i++) {
        arr.push(i);
    }
    return arr;
};

const newPerson = () => {

    return {
        id:
            Math.floor(Math.random() * Math.floor(100)),

        firstName:
            Math.random() > 0.66
                ? "Bob"
                : Math.random() > 0.33 ? "Jill" : "Jackie",
        lastName:
            Math.random() > 0.66
                ? "Workhard"
                : Math.random() > 0.33 ? "Bootsmith" : "Fighterpilot",
        status:
            Math.random() > 0.66
                ? "relationship"
                : Math.random() > 0.33 ? "complicated" : "single"
    };
};

export function makeData(len = 5553) {
    return range(len).map(d => {
        return {
            ...newPerson(),
            children: range(10).map(newPerson)
        };
    });
}