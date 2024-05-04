
export async function connectMetaMask() {
    try {
        if (window.ethereum) {
            await window.ethereum.request({ method: "eth_requestAccounts" });
            const accounts = await window.ethereum.request({ method: "eth_accounts" });
            let userAddress = accounts[0];
            console.log("User Address:", userAddress);
            return userAddress;

        } else {
            console.log("MetaMask not installed.");
            return null;
        }
    } catch (error) {
        console.error("Error connecting with MetaMask:", error);
        return null;
    }
}

