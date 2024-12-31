export function Output({ solution, output, isLoading }) {

    const isCorrectAnswer = solution.trim() === output?.trim()
    // const isCorrectAnswer = solution === output

    return (
        <section>
            {isLoading ? (
                <span class="loader"></span>
            ) : (
                <div>
                    {output ? output : 'Click run code button to see the result 😊'}
                    {output && (
                        <p>{isCorrectAnswer ? "THAT'S CORRECT!!!!! 🤩 🤩" : "TRY AGAIN... 😰 😰"}</p>
                    )}
                </div>
            )}
        </section>
    )
}