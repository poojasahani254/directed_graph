import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon as FAIcon } from "@fortawesome/react-fontawesome";
import {
    faCoffee,
    faCheckCircle,
    faCommentAlt,
    faStickyNote,
    faComments
} from "@fortawesome/free-solid-svg-icons";

export const FontAwesomeIcon = ({ className = "", ...props }) => (
    <FAIcon {...props} className={`${className} fa-w-18`} />
);

export const prepareIcons = () => {

    library.add(
        faCoffee,
        faCheckCircle,
        faCommentAlt,
        faStickyNote,
        faComments
    );
};
