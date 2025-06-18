function calculateVat() {
    const basePrice = $('#basePrice').val();
    const vatRate = 7;
    const vat = basePrice * (vatRate / 100);
    console.log(basePrice, vatRate, vat);
    $('#result').html(
        `<p>Base Price: ${basePrice}</p>
        <p>VAT Rate: ${vatRate}%</p>
        <p>VAT Amount: ${vat.toFixed(2)}</p>
        <p>Total Price: ${(parseFloat(basePrice) + vat).toFixed(2)}</p>`
    )
}

function calculateBasePrice() {
    const vatPrice = $('#vatPrice').val();
    const vatRate = $('#vatPrice').val();
    const basePrice = vatPrice / (1 + (vatRate / 100));
    console.log(vatPrice, vatRate, basePrice);
    $('#result2').html(
        `<p>VAT Price: ${vatPrice}</p>
        <p>VAT Rate: ${vatRate}%</p>
        <p>Base Price: ${basePrice.toFixed(2)}</p>
        <p>VAT Amount: ${vat.toFixed(2)}</p>`
    )
}