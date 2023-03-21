import React, { useState, useEffect } from "react";

import Head from "next/head";

export default function API(props) {
    const [prompter, setPrompter] = useState("");
    const [promptResult, setPromptResult] = useState("");
    const [apiCalled, setApiCalled] = useState(false);

    const callApi = async () => {
        // setApiCalled(true)
        const response = await fetch("/api/openai", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                prompt: "Schreibe einen Satz mit interessanten Fakten über Bäume in Deutschland, deren Wirkung auf die Menschen und die Umwelt, und warum Bäume in Städten eine gute Idee sind. Beginne den Satz immer mit (Wussten Sie, dass...). Halte dich kurz, max´. 15 Wörter",
            }),
        }).then((response) => {
            console.log(response);
            return response.json();
        });

        if (response) {
            console.log(response.text);
            setPromptResult(response.text);
            props.onApiSuccess?.(response.text);
        }
    };

    useEffect(() => {
        callApi();
    }, []);

    return <h1 className="h-full flex items-center col-span-12">{promptResult}</h1>;
}
