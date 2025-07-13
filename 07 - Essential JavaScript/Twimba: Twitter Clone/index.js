import { v4 as uuidv4 } from "https://jspm.dev/uuid"
import { tweetsData as initialTweetsData } from "./data.js"

let tweetsData = [...initialTweetsData]

document.addEventListener("click", e => {
	if (e.target.dataset.like) {
		handleLikeClick(e.target.dataset.like)
	} else if (e.target.dataset.retweet) {
		handleRetweetClick(e.target.dataset.retweet)
	} else if (e.target.dataset.reply) {
		handleReplyClick(e.target.dataset.reply)
	} else if (e.target.id === "tweet-btn") {
		handleTweetBtnClick()
	} else if (e.target.dataset.delete) {
		handleDeleteClick(e.target.dataset.delete)
	} else if (e.target.id.startsWith("reply-btn-")) {
		const tweetId = e.target.id.replace("reply-btn-", "")
		handleReplySubmit(tweetId)
	}
})

function handleLikeClick(tweetId) {
	const targetTweetObj = tweetsData.filter(tweet => tweet.uuid === tweetId)[0]

	if (targetTweetObj.isLiked) {
		targetTweetObj.likes--
	} else {
		targetTweetObj.likes++
	}
	targetTweetObj.isLiked = !targetTweetObj.isLiked
	render()
}

function handleRetweetClick(tweetId) {
	const targetTweetObj = tweetsData.filter(tweet => tweet.uuid === tweetId)[0]

	if (targetTweetObj.isRetweeted) {
		targetTweetObj.retweets--
	} else {
		targetTweetObj.retweets++
	}
	targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted
	render()
}

function handleReplyClick(replyId) {
	document.getElementById(`replies-${replyId}`).classList.toggle("hidden")
}

function handleTweetBtnClick() {
	const tweetInput = document.getElementById("tweet-input")

	if (tweetInput.value) {
		tweetsData.unshift({
			handle: `@Scrimba`,
			profilePic: `images/scrimbalogo.png`,
			likes: 0,
			retweets: 0,
			tweetText: tweetInput.value,
			replies: [],
			isLiked: false,
			isRetweeted: false,
			uuid: uuidv4()
		})
		render()
		tweetInput.value = ""
	}
}

function handleDeleteClick(tweetId) {
	const tweet = tweetsData.find(tweet => tweet.uuid === tweetId)

	if (tweet && tweet.handle === "@Scrimba") {
		tweetsData = tweetsData.filter(tweet => tweet.uuid !== tweetId)
		render()
	}
}

function handleReplySubmit(tweetId) {
	const replyInput = document.getElementById(`reply-input-${tweetId}`)

	if (replyInput.value) {
		const targetTweetObj = tweetsData.filter(tweet => tweet.uuid === tweetId)[0]

		targetTweetObj.replies.unshift({
			handle: `@Scrimba`,
			profilePic: `images/scrimbalogo.png`,
			tweetText: replyInput.value
		})

		render()
		replyInput.value = ""
	}
}

function getFeedHtml() {
	let feedHtml = ``

	tweetsData.forEach(tweet => {
		let likeIconClass = ""

		if (tweet.isLiked) {
			likeIconClass = "liked"
		}

		let retweetIconClass = ""

		if (tweet.isRetweeted) {
			retweetIconClass = "retweeted"
		}

		let repliesHtml = ""

		repliesHtml += `
<div class="reply-input-area">
    <div class="reply-to-info">
        <span>Replying to ${tweet.handle}</span>
    </div>
    <div class="reply-input-container">
        <img src="images/scrimbalogo.png" class="profile-pic">
        <textarea placeholder="Tweet your reply" id="reply-input-${tweet.uuid}"></textarea>
    </div>
    <button id="reply-btn-${tweet.uuid}" class="reply-btn">Reply</button>
</div>
`

		if (tweet.replies.length > 0) {
			tweet.replies.forEach(reply => {
				repliesHtml += `
<div class="tweet-reply">
    <div class="tweet-inner">
        <img src="${reply.profilePic}" class="profile-pic">
            <div>
                <p class="handle">${reply.handle}</p>
                <p class="tweet-text">${reply.tweetText}</p>
            </div>
        </div>
</div>
`
			})
		}

		feedHtml += `
<div class="tweet">
    <div class="tweet-inner">
        <img src="${tweet.profilePic}" class="profile-pic">
        <div>
            <p class="handle">${tweet.handle}</p>
            <p class="tweet-text">${tweet.tweetText}</p>
            <div class="tweet-details">
                <span class="tweet-detail">
                    <i class="fa-regular fa-comment-dots"
                    data-reply="${tweet.uuid}"
                    ></i>
                    ${tweet.replies.length}
                </span>
                <span class="tweet-detail">
                    <i class="fa-solid fa-heart ${likeIconClass}"
                    data-like="${tweet.uuid}"
                    ></i>
                    ${tweet.likes}
                </span>
                <span class="tweet-detail">
                    <i class="fa-solid fa-retweet ${retweetIconClass}"
                    data-retweet="${tweet.uuid}"
                    ></i>
                    ${tweet.retweets}
                </span>
                ${
					tweet.handle === "@Scrimba"
						? `<span class="tweet-detail delete-btn">
                    <i class="fa-solid fa-trash"
                    data-delete="${tweet.uuid}"
                    ></i>
                  </span>`
						: ""
				}
            </div>   
        </div>            
    </div>
    <div class="hidden" id="replies-${tweet.uuid}">
        ${repliesHtml}
    </div>   
</div>
`
	})
	return feedHtml
}

function render() {
	document.getElementById("feed").innerHTML = getFeedHtml()
}

render()
