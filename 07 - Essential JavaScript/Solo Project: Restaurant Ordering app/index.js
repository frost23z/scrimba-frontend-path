import { menuArray } from "./data.js"

// State management
let order = []
let appliedCoupon = null
const coupons = {
	"NEW YEAR": 0.2,
	EID: 0.15
}

// DOM elements
const menuItemsContainer = document.getElementById("menu-items")
const orderSection = document.getElementById("order-section")
const orderItemsContainer = document.getElementById("order-items")
const totalPriceElement = document.getElementById("total-price")
const completeOrderBtn = document.getElementById("complete-order-btn")
const paymentModal = document.getElementById("payment-modal")
const paymentForm = document.getElementById("payment-form")
const orderComplete = document.getElementById("order-complete")
const customerNameElement = document.getElementById("customer-name")
const couponInput = document.getElementById("coupon-input")
const applyCouponBtn = document.getElementById("apply-coupon-btn")
const couponMessage = document.getElementById("coupon-message")
const discountLine = document.getElementById("discount-line")
const discountAmount = document.getElementById("discount-amount")
const ratingStars = document.querySelectorAll(".star-btn")
const ratingMessage = document.getElementById("rating-message")

// Event listeners
document.addEventListener("click", handleClick)
completeOrderBtn.addEventListener("click", showPaymentModal)
paymentForm.addEventListener("submit", handlePayment)
paymentModal.addEventListener("click", closeModalOnBackdrop)

// Add coupon event listener if element exists
if (applyCouponBtn) {
	applyCouponBtn.addEventListener("click", handleApplyCoupon)
}

// Add rating event listeners if elements exist
if (ratingStars && ratingStars.length > 0) {
	ratingStars.forEach(star => star.addEventListener("click", handleRating))
}

// Initialize app
function init() {
	renderMenuItems()
}

// Render menu items
function renderMenuItems() {
	let menuHtml = ""

	menuArray.forEach(item => {
		menuHtml += `
            <div class="menu-item">
                <div class="menu-emoji">${item.emoji}</div>
                <div class="menu-details">
                    <h3 class="menu-name">${item.name}</h3>
                    <p class="menu-ingredients">${item.ingredients.join(", ")}</p>
                    <p class="menu-price">$${item.price}</p>
                </div>
                <button class="add-btn" data-id="${item.id}">+</button>
            </div>
        `
	})

	menuItemsContainer.innerHTML = menuHtml
}

// Handle clicks
function handleClick(e) {
	if (e.target.classList.contains("add-btn")) {
		const itemId = parseInt(e.target.dataset.id)
		addToOrder(itemId)
	} else if (e.target.classList.contains("remove-btn")) {
		const itemId = parseInt(e.target.dataset.id)
		removeFromOrder(itemId)
	}
}

// Add item to order
function addToOrder(itemId) {
	const item = menuArray.find(menuItem => menuItem.id === itemId)

	if (item) {
		const existingOrderItem = order.find(orderItem => orderItem.id === itemId)

		if (existingOrderItem) {
			existingOrderItem.quantity += 1
		} else {
			order.push({
				...item,
				quantity: 1
			})
		}

		renderOrder()
	}
}

// Remove item from order
function removeFromOrder(itemId) {
	const itemIndex = order.findIndex(orderItem => orderItem.id === itemId)

	if (itemIndex !== -1) {
		const item = order[itemIndex]

		if (item.quantity > 1) {
			item.quantity -= 1
		} else {
			order.splice(itemIndex, 1)
		}

		renderOrder()
	}
}

// Render order
function renderOrder() {
	if (order.length === 0) {
		orderSection.classList.add("hidden")
		return
	}

	orderSection.classList.remove("hidden")

	let orderHtml = ""

	order.forEach(item => {
		const itemTotal = item.price * item.quantity
		const quantityText = item.quantity > 1 ? ` (x${item.quantity})` : ""
		orderHtml += `
            <div class="order-item">
                <div class="order-item-info">
                    <h4 class="order-item-name">${item.name}${quantityText}</h4>
                    <button class="remove-btn" data-id="${item.id}">remove</button>
                </div>
                <p class="order-item-price">$${itemTotal}</p>
            </div>
        `
	})

	orderItemsContainer.innerHTML = orderHtml
	updateTotalPrice()
}

// Update total price
function updateTotalPrice() {
	const total = order.reduce((sum, item) => sum + item.price * item.quantity, 0)
	let discount = 0
	if (appliedCoupon && coupons[appliedCoupon]) {
		discount = total * coupons[appliedCoupon]
		discountLine.classList.remove("hidden")
		discountAmount.textContent = `-$${discount.toFixed(2)}`
	} else {
		discountLine.classList.add("hidden")
		discountAmount.textContent = "-$0.00"
	}
	totalPriceElement.textContent = `$${(total - discount).toFixed(2)}`
}

// Show payment modal
function showPaymentModal() {
	if (order.length === 0) return

	paymentModal.classList.remove("hidden")
	document.body.style.overflow = "hidden"

	// Focus on first input
	const firstInput = paymentForm.querySelector("input")
	if (firstInput) {
		setTimeout(() => firstInput.focus(), 100)
	}
}

// Close modal on backdrop click
function closeModalOnBackdrop(e) {
	if (e.target === paymentModal) {
		closePaymentModal()
	}
}

// Close payment modal
function closePaymentModal() {
	paymentModal.classList.add("hidden")
	document.body.style.overflow = "auto"
}

// Handle payment form submission
function handlePayment(e) {
	e.preventDefault()

	const formData = new FormData(paymentForm)
	const cardName = document.getElementById("card-name").value.trim()
	const cardNumber = document.getElementById("card-number").value.trim()
	const cardCvv = document.getElementById("card-cvv").value.trim()

	// Basic form validation
	const isCardNameValid = cardName && cardName.length > 0
	const isCardNumberValid = cardNumber && cardNumber.length >= 13
	const isCardCvvValid = cardCvv && cardCvv.length >= 3

	if (!isCardNameValid) {
		alert("Please enter your name.")
		return
	}

	if (!isCardNumberValid) {
		alert("Please enter a valid card number.")
		return
	}

	if (!isCardCvvValid) {
		alert("Please enter a valid CVV.")
		return
	}

	// Process payment (simulate)
	processPayment(cardName)
}

// Process payment
function processPayment(customerName) {
	// Close modal
	closePaymentModal()

	// Hide order section
	orderSection.classList.add("hidden")

	// Show order complete
	customerNameElement.textContent = customerName
	orderComplete.classList.remove("hidden")

	// Reset order and coupon
	order = []
	appliedCoupon = null

	// Reset coupon UI if elements exist
	if (couponInput) {
		couponInput.value = ""
		couponInput.disabled = false
	}
	if (applyCouponBtn) {
		applyCouponBtn.disabled = false
	}
	if (couponMessage) {
		couponMessage.textContent = ""
		couponMessage.className = "coupon-message hidden"
	}
	if (discountLine) {
		discountLine.classList.add("hidden")
	}
	if (discountAmount) {
		discountAmount.textContent = ""
	}

	// Clear form
	paymentForm.reset()

	// Reset rating section
	ratingStars.forEach(star => star.classList.remove("active"))
	if (ratingMessage) {
		ratingMessage.classList.add("hidden")
	}
	const ratingSection = document.querySelector(".rating-section")
	if (ratingSection) {
		ratingSection.style.opacity = "1"
		ratingSection.style.pointerEvents = "auto"
	}

	// Auto-hide order complete after 8 seconds and reset to menu
	setTimeout(() => {
		orderComplete.classList.add("hidden")
	}, 8000)
}

// Handle apply coupon
function handleApplyCoupon() {
	const code = couponInput.value.trim().toUpperCase()

	if (!couponMessage) return

	couponMessage.classList.remove("hidden")

	if (code in coupons) {
		appliedCoupon = code
		couponMessage.textContent = `Coupon '${code}' applied! ${Math.round(coupons[code] * 100)}% discount`
		couponMessage.className = "coupon-message success"
		applyCouponBtn.disabled = true
		couponInput.disabled = true
	} else {
		appliedCoupon = null
		couponMessage.textContent = "Invalid coupon code. Try: NEW YEAR, EID"
		couponMessage.className = "coupon-message error"
	}
	updateTotalPrice()
}

// Submit rating
function submitRating(e) {
	const selectedStar = e.target
	const rating = parseInt(selectedStar.dataset.value)

	ratingStars.forEach(star => {
		star.classList.remove("selected")
	})

	for (let i = 0; i < rating; i++) {
		ratingStars[i].classList.add("selected")
	}

	let message = ""
	switch (rating) {
		case 1:
			message = "Terrible! We will strive to improve."
			break
		case 2:
			message = "Bad! We appreciate your feedback."
			break
		case 3:
			message = "Okay! Thanks for your rating."
			break
		case 4:
			message = "Good! We are glad you liked it."
			break
		case 5:
			message = "Excellent! Thank you for your support."
			break
	}

	ratingMessage.textContent = message
}

// Handle rating
function handleRating(e) {
	const rating = parseInt(e.target.dataset.rating)

	// Update star appearances
	ratingStars.forEach((star, index) => {
		if (index < rating) {
			star.classList.add("active")
		} else {
			star.classList.remove("active")
		}
	})

	// Show thank you message
	ratingMessage.classList.remove("hidden")
	ratingMessage.textContent = `Thank you for your ${rating}-star rating!`

	// Hide rating section after 2 seconds
	setTimeout(() => {
		const ratingSection = document.querySelector(".rating-section")
		ratingSection.style.opacity = "0.5"
		ratingSection.style.pointerEvents = "none"
	}, 2000)
}

// Format card number input
const cardNumberInput = document.getElementById("card-number")
if (cardNumberInput) {
	cardNumberInput.addEventListener("input", e => {
		const value = e.target.value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
		const formattedValue = value.match(/.{1,4}/g)?.join(" ") || value
		if (formattedValue !== e.target.value) {
			e.target.value = formattedValue
		}
	})
}

// Format CVV input (numbers only)
const cardCvvInput = document.getElementById("card-cvv")
if (cardCvvInput) {
	cardCvvInput.addEventListener("input", e => {
		e.target.value = e.target.value.replace(/[^0-9]/g, "")
	})
}

// Close modal with Escape key
document.addEventListener("keydown", e => {
	if (e.key === "Escape" && !paymentModal.classList.contains("hidden")) {
		closePaymentModal()
	}
})

// Initialize the app
init()
