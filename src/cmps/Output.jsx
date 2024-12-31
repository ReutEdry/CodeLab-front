export function Output({ solution, output, isLoading }) {
    const isCorrectAnswer = solution.trim() === output?.trim()

    return (
        <section>
            {isLoading ? (
                <span className="loader"></span>
            ) : (
                <div>
                    {output ? (<p className="result-msg">{output}</p>) : (<p className="start-msg">Click run code button to see the result 😊</p>)}
                    {output && (
                        <p className={`msg ${isCorrectAnswer ? 'sucess' : 'failed'}`}>{isCorrectAnswer ? "THAT'S CORRECT!!!!! 🤩 🤩" : "TRY AGAIN... 😰 😰"}</p>
                    )}
                </div>
            )}
        </section>
    )
}