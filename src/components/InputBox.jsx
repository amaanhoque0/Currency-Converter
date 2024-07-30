import React, { useId } from 'react'

function InputBox({
    label,
    amount,
    onAmountChange,     //change factor corresponding to amount
    onCurrencyChange,   //changing the currency option
    currencyOptions = [],    //list of currency option
    selectCurrency = "usd",     //default currency option
    amountDisable = false,  //null value for amount
    currencyDisable = false,    //null value for currency
    className = "",     //custom css class if user wants to inject it
}) {
    //<-----Optional Optimization----->
    /* Now, we will also see, that the label element will be re-rendered everytime, so to avoid it, we will create a unique Id for for each label of currency using useId
    useId is a React Hook for generating unique IDs that can be passed to accessibility attributes(each html element has a multiple attributes, accessed by '.').  
    In our case, we have so many attributes for a single currency, so instead if providing a unique Id for each, we will use 'useId' for doing the same
    <----DO NOT USE useId TO GENERATE UNIQUE KEY FOR LOOPS---->*/

    const amtInputId = useId()
    return (
        <div className={`bg-white p-3 rounded-lg text-sm flex ${className}`}>
            <div className="w-1/2">
                <label 
                htmlFor={amtInputId}            //{optional, performance optimization purpose only}
                className="text-black/40 mb-2 inline-block">
                    {label}
                </label>
                <input
                    id={amtInputId}             //calling the id for each label generated from label htmlFor, and calling them in id.{optional, performance optimization purpose only}
                    className="outline-none w-full bg-transparent py-1.5"
                    type="number"
                    placeholder="Amount"
                    disabled={amountDisable}
                    value={amount}
                    onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))}  //this syntax is used to confirm whether onAmountChange exists on not,(function and refernce both present, means function present; used as a checking method if function exists or not)
                // target.value might returns a string, we convert it to number, just to be safe
                />
            </div>
            <div className="w-1/2 flex flex-wrap justify-end text-right">
                <p className="text-black/40 mb-2 w-full">Currency Type</p>
                <select
                    className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none"
                    disabled={currencyDisable}
                    value={selectCurrency}
                    onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
                >



                    {currencyOptions.map((currency) => (             //if we use {} after callback, we would have to return a value for each cases, so we are using ()
                        //in this approach, we are using key, because otherwise, each time this component is called, react will need to re-render it entirely, causing performance issues while updating. Hence we use it to improve efficiency
                        /*
                            Keys are used in JSX when looping over elements to help React efficiently track and update them. They provide a way to uniquely identify elements, optimize updates, and avoid warnings. They are crucial for React's internal reconciliation algorithm to work correctly and improve performance when dealing with dynamic lists of elements.
                        */
                        <option key={currency} value={currency}>
                            {currency}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default InputBox;



//while exporting, for bigger projects you can create a 'Index.js' file, and import all of the components there
/*now while exporting, you can do the following
    export{InputBox, SearchBox, ...}
*/