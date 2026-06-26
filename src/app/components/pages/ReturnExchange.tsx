export function ReturnExchange() {
  return (
    <section
      className="flex flex-col font-good-sans"
      style={{ padding: "clamp(52px,8vh,100px) clamp(20px,5vw,80px) clamp(12px,2vh,28px)" }}
    >
      <h1
        className="uppercase flex-shrink-0 mb-6"
        style={{ fontSize: 11, fontWeight: 400, letterSpacing: "0.2em" }}
      >
        Returns &amp; Exchange
      </h1>

      <div className="flex flex-col gap-10 md:grid md:grid-cols-2 md:gap-x-16 md:flex-1 md:min-h-0" style={{ fontSize: 13, lineHeight: 1.7 }}>

        {/* Left column — main returns policy */}
        <div className="flex flex-col gap-4 md:overflow-hidden">
          <p>
            After receiving the item, you have 15 days to request a return.
          </p>
          <p>
            To be eligible for a return, all items must be in the condition that you received them — unwashed, unworn, unaltered and unused, with the original Long Season tags, in their original packaging. A receipt or proof of purchase will also be required to process your request.
          </p>
          <p>
            Contact us at{" "}
            <a href="mailto:Hello@longseason.shop" className="underline">Hello@longseason.shop</a>
            {" "}to start the process of your return. If your return is accepted, we'll send you a return shipping label, as well as instructions on how and where to send your package. Items sent back to us without first processing a return request will not be accepted.
          </p>
          <p>
            Please note that the cost of return shipping is the responsibility of the customer.
          </p>
          <p>
            For further information, kindly mail us at{" "}
            <a href="mailto:Hello@longseason.shop" className="underline">Hello@longseason.shop</a>.
          </p>
        </div>

        {/* Right column — secondary sections */}
        <div className="flex flex-col gap-6 md:overflow-hidden md:pt-[15%]">

          <div className="flex flex-col gap-2">
            <h2 className="uppercase opacity-50" style={{ fontSize: 11, letterSpacing: "0.2em" }}>Damages and Issues</h2>
            <p>
              If the items you receive are damaged or incorrect, please let us know so we may amend the issue.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="uppercase opacity-50" style={{ fontSize: 11, letterSpacing: "0.2em" }}>Exceptions / Non-Returnable Items</h2>
            <p>
              Certain types of items cannot be returned, namely custom products (such as special orders or personalised items). Please contact us at{" "}
              <a href="mailto:Hello@longseason.shop" className="underline">Hello@longseason.shop</a>
              {" "}if you have questions or concerns about your specific item.
            </p>
            <p>
              Unfortunately, we cannot accept returns on sale items or gift cards.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="uppercase opacity-50" style={{ fontSize: 11, letterSpacing: "0.2em" }}>Exchanges</h2>
            <p>
              The fastest way to ensure you get what you want is to return the item you have, and once the return is accepted, make a separate purchase for the new item.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="uppercase opacity-50" style={{ fontSize: 11, letterSpacing: "0.2em" }}>Refunds</h2>
            <p>
              You can return an item to us up to 7 days after purchase. We will notify you once we've received and inspected your return, and let you know if the refund was approved or not. If approved, you'll be automatically refunded on your original payment method. Please allow up to 3 weeks to process your return — we will keep you informed every step of the way.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
