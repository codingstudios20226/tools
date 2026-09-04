class BetterVerify {
    constructor() {
        this.generatedCode = "";
        this.userInputCode = "";
        this.expireTime = 0;
    }

    getInfo() {
        return {
            id: "betterVerify",
            name: "Better Verification",
            blocks: [
                {
                    opcode: "makeCode",
                    blockType: "command",
                    text: "generate verification code"
                },
                {
                    opcode: "openInput",
                    blockType: "command",
                    text: "open verification UI"
                },
                {
                    opcode: "getCode",
                    blockType: "reporter",
                    text: "generated code"
                },
                {
                    opcode: "isVerified",
                    blockType: "Boolean",
                    text: "code is verified?"
                },
                {
                    opcode: "isExpired",
                    blockType: "Boolean",
                    text: "code is expired?"
                }
            ]
        };
    }

    makeCode() {
        this.generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
        this.expireTime = Date.now() + (60 * 60 * 1000); // 1 hour
        console.log("Generated code:", this.generatedCode);
    }

    openInput() {
        const overlay = document.createElement("div");
        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100vw";
        overlay.style.height = "100vh";
        overlay.style.background = "rgba(0,0,0,0.5)";
        overlay.style.display = "flex";
        overlay.style.alignItems = "center";
        overlay.style.justifyContent = "center";
        overlay.style.zIndex = "999999";
        overlay.style.animation = "fadeIn 0.3s";

        const modal = document.createElement("div");
        modal.style.background = "white";
        modal.style.padding = "25px";
        modal.style.borderRadius = "15px";
        modal.style.boxShadow = "0 0 20px rgba(0,0,0,0.3)";
        modal.style.width = "300px";
        modal.style.textAlign = "center";
        modal.style.animation = "popIn 0.25s";

        modal.innerHTML = `
            <h2 style="margin-bottom:15px;font-family:sans-serif;">Verify Code</h2>
            <p style="font-size:14px;margin-bottom:10px;font-family:sans-serif;">
                Enter the 6-digit verification code
            </p>
            <input id="verifyInput" 
                   style="font-size:22px;padding:10px;width:90%;border-radius:10px;border:2px solid #444;text-align:center;">
            <br><br>
            <button id="verifyBtn"
                    style="font-size:18px;padding:10px 20px;border:none;border-radius:10px;background:#4CAF50;color:white;cursor:pointer;">
                Confirm
            </button>
            <br><br>
            <button id="closeBtn"
                    style="font-size:14px;padding:5px 10px;border:none;border-radius:8px;background:#ccc;cursor:pointer;">
                Close
            </button>
        `;

        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        document.getElementById("verifyBtn").onclick = () => {
            this.userInputCode = document.getElementById("verifyInput").value.trim();
            overlay.remove();
        };

        document.getElementById("closeBtn").onclick = () => {
            overlay.remove();
        };

        const style = document.createElement("style");
        style.innerHTML = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes popIn {
                from { transform: scale(0.8); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }

    getCode() {
        return this.generatedCode;
    }

    isVerified() {
        if (Date.now() > this.expireTime) return false;
        return this.userInputCode === this.generatedCode;
    }

    isExpired() {
        return Date.now() > this.expireTime;
    }
}

Scratch.extensions.register(new BetterVerify());

