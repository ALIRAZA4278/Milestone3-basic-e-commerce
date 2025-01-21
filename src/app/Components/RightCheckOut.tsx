import React from "react";

type CartItem = {
    productId: string;
    title: string;
    price: number;
    quantity: number;
};

interface RightCheckOutProps {
    cartItems: CartItem[];
}

const RightCheckOut: React.FC<RightCheckOutProps> = ({ cartItems }) => {

    // Prepare cart data for submission (convert items to a string or formatted text)
    const cartDetails = cartItems.map((item) => `${item.title} x ${item.quantity} - Rs. ${(item.price * item.quantity).toFixed(2)}`).join(", ");


    return (
        <div>
            <form action="https://api.web3forms.com/submit" method="POST">
                <input type="hidden" name="access_key" value={process.env.Contact_form_access_key} />
                <input type="hidden" name="Order Details" value={cartDetails} />

                <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-4">
                        First Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full border border-gray-300 rounded-md px-6 py-6 "
                    />
                </div>
                <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-4">
                        Last Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="last Name"
                        required
                        className="w-full border border-gray-300 rounded-md px-6 py-6 "
                    />
                </div>

                <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-4">
                        Company Name (Optional)
                    </label>
                    <input
                        type="text"
                        id="subject"
                        name="Company Name"
                        className="w-full border border-gray-300 rounded-md px-4 py-6"
                        placeholder="This is optional"
                    />
                </div>

                <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-4">
                        Country / Region
                    </label>
                    <input
                        id="subject"
                        name="Country / Region"
                        required
                        placeholder='Pakistan'
                        className="w-full border border-gray-300 rounded-md px-4 py-6"
                    />

                </div>

                <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-4">
                        Town / City
                    </label>
                    <input
                        type="text"
                        id="subject"
                        name="Town / City"
                        className="w-full border border-gray-300 rounded-md px-4 py-6"
                    />
                </div>


                <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-4">
                        Province
                    </label>
                    <input
                        id="subject"
                        name="  Province"
                        className="w-full border border-gray-300 rounded-md px-4 py-6"
                    />

                </div>

                <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-4">
                        Zip Code
                    </label>
                    <input
                        type="number"
                        id="subject"
                        name="Zip Code"
                        className="w-full border border-gray-300 rounded-md px-4 py-6"
                    />
                </div>


                <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-4">
                        Phone
                    </label>
                    <input
                        type="number"
                        id="subject"
                        name="Phone"
                        className="w-full border border-gray-300 rounded-md px-4 py-6"
                    />
                </div>

                <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-4">
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="subject"
                        name=" Email Address"
                        className="w-full border border-gray-300 rounded-md px-4 py-6"
                    />
                </div>


                <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-4">
                        Address
                    </label>
                    <textarea
                        id="Address"
                        name="Address"
                        className="w-full border border-gray-300 rounded-md px-4 py-6"
                        placeholder="Address"
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-4">
                        Additional information
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        className="w-full border border-gray-300 rounded-md px-4 py-6"
                        placeholder="Additional information"
                    ></textarea>
                </div>


                {/* Honeypot Spam Protection */}
                <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />

                {/* Custom Confirmation / Success Page */}
                {/* <input type="hidden" name="redirect" value="https://mywebsite.com/thanks.html" /> */}

                <button
                    type="submit"
                    className="w-full bg-transparent text-black border-4 border-gray-300 rounded-full py-4 px-4 hover:bg-gray-800 hover:text-white"
                >
                    Submit
                </button>
            </form>
        </div>

    )
}

export default RightCheckOut
