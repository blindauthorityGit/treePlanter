import React, { useState, useEffect } from "react";

import Head from "next/head";

export default function API(props) {
    const [prompter, setPrompter] = useState("");
    const [promptResult, setPromptResult] = useState("");
    const [apiCalled, setApiCalled] = useState(false);

    const callApi = async () => {
        try {
            const res = await fetch("/api/openai", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    prompt: "Schreibe einen Satz mit interessanten Fakten über Bäume in Deutschland, deren Wirkung auf die Menschen und die Umwelt, und warum Bäume in Städten eine gute Idee sind. Beginne den Satz immer mit (Wussten Sie, dass...). Halte dich kurz, max. 15 Wörter",
                }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                console.error("API Error:", errorData);
                return;
            }

            const data = await res.json();
            console.log("API Response:", data);

            if (data && data.text) {
                setPromptResult(data.text);
                props.onApiSuccess?.(data.text);
            } else {
                console.error("Unexpected API response:", data);
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    useEffect(() => {
        callApi();
    }, []);

    return <h1 className="h-full flex items-center col-span-12">{promptResult}</h1>;
}
