<script setup>
import { ref, computed, onMounted, onUpdated } from 'vue';
import { format, subDays, isToday, isYesterday, parseISO, subHours } from 'date-fns';

function adjustTime(date, hours) {
	return subHours(date, hours);
}

const chats = ref([
	{
		id: 1,
		name: "Angelie Crison",
		avatar: "https://api.dicebear.com/9.x/miniavs/svg?seed=Coco&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf",
		messages: [
			{ text: "Yes sure, Any problem with your assignment?", time: format(adjustTime(subDays(new Date(), 3), 3), "yyyy-MM-dd HH:mm:ss"), file: {url: "https://images.unsplash.com/photo-1608742213509-815b97c30b36?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}, own: false },
			{ text: "Morning Angelie, I have question about My Task", time: format(adjustTime(subDays(new Date(), 2), 2), "yyyy-MM-dd HH:mm:ss"), own: true }
		],
		isRead: true,
		isOnline: false
	},
	{
		id: 2,
		name: "John Doe",
		avatar: "https://api.dicebear.com/9.x/miniavs/svg?seed=Bailey&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf",
		messages: [
			{ text: "Hello, how can I help you today?", time: format(adjustTime(new Date(), 1), "yyyy-MM-dd HH:mm:ss"), own: false },
			{ text: "I have some issues with my account.", time: format(adjustTime(new Date(), 0), "yyyy-MM-dd HH:mm:ss"), own: true }
		],
		isRead: true,
		isOnline: false
	},
	{
		id: 3,
		name: "Emery Korsgard",
		avatar: "https://api.dicebear.com/9.x/miniavs/svg?seed=Buster&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf",
		messages: [
			{ text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, tempore pariatur. Autem, laudantium quae.", time: format(adjustTime(subDays(new Date(), 5), 3), "yyyy-MM-dd HH:mm:ss"), own: false },
		],
		isRead: false,
		isOnline: true
	},
	{
		id: 4,
		name: "Jeremy Zucker",
		avatar: "https://api.dicebear.com/9.x/miniavs/svg?seed=Angel&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf",
		messages: [
			{ text: "Lorem ipsum dolor sit amet consectetur adipisicing.", time: format(adjustTime(subDays(new Date(), 2), 3), "yyyy-MM-dd HH:mm:ss"), own: false },
			{ text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta nulla et excepturi ipsam.", time: format(adjustTime(subDays(new Date(), 2), 2), "yyyy-MM-dd HH:mm:ss"), file: {url: "https://images.unsplash.com/photo-1520583457224-aee11bad5112?q=80&w=1365&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}, own: true },
			{ text: "Lorem ipsum.", time: format(adjustTime(subDays(new Date(), 0), 0), "yyyy-MM-dd HH:mm:ss"), own: false },
		],
		isRead: false,
		isOnline: true
	},
	{
		id: 5,
		name: "Nadia Lauren",
		avatar: "https://api.dicebear.com/9.x/miniavs/svg?seed=Lucky&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf",
		messages: [
			{ text: "Lorem, ipsum dolor.", time: format(adjustTime(subDays(new Date(), 8), 3), "yyyy-MM-dd HH:mm:ss"), own: false },
		],
		isRead: false,
		isOnline: true
	},
	{
		id: 6,
		name: "Jason Statham",
		avatar: "https://api.dicebear.com/9.x/miniavs/svg?seed=Patches&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf",
		messages: [
			{ text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam quaerat aperiam velit accusantium magni. Illo.", time: format(adjustTime(subDays(new Date(), 2), 3), "yyyy-MM-dd HH:mm:ss"), own: true }
		],
		isRead: true,
		isOnline: false
	},
	{
		id: 7,
		name: "Angel Kimberly",
		avatar: "https://api.dicebear.com/9.x/miniavs/svg?seed=Charlie&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf",
		messages: [
			{ text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet, ex.", time: format(adjustTime(subDays(new Date(), 13), 2), "yyyy-MM-dd HH:mm:ss"), file: {url: "https://images.unsplash.com/photo-1505238680356-667803448bb6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}, own: false },
			{ text: "Lorem ipsum dolor sit amet.", time: format(adjustTime(subDays(new Date(), 13), 1), "yyyy-MM-dd HH:mm:ss"), own: true }
		],
		isRead: true,
		isOnline: true
	},
	{
		id: 8,
		name: "Jason Momoa",
		avatar: "https://api.dicebear.com/9.x/miniavs/svg?seed=Ginger&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf",
		messages: [
			{ text: "Lorem ipsum dolor sit amet.", time: format(adjustTime(subDays(new Date(), 0), 15), "yyyy-MM-dd HH:mm:ss"), own: false }
		],
		isRead: false,
		isOnline: false
	},
]);

const currentChatId = ref(0);
const chatSelected = ref(false)

const currentChat = computed(() => {
	return chats.value.find(chat => chat.id === currentChatId.value);
});

const setChat = (id) => {
	currentChatId.value = id;
	chats.value[currentChatId.value-1].isRead = true
	chatSelected.value = true
	document.body.classList.add('_lock');
};

const newMessage = ref('');
function searchKeydown(event) {
	if (event.key === 'Enter') {
		event.preventDefault();
		sendMessage();
	}
}

const formatMessageDay = (date, year) => {
	const parsedDate = parseISO(date);
	if (isToday(parsedDate)) return 'Today';
	if (isYesterday(parsedDate)) return 'Yesterday';
	if (year === false) return format(parsedDate, `dd MMM`);
	return format(parsedDate, `dd MMM yyyy`)
}
const searchQuerry = ref('')
function performSearch(query) {
	searchQuerry.value = query
}
const searchedChats = computed(() => {
	return chats.value.filter(chat => chat.name.toLowerCase().includes(searchQuerry.value.toLowerCase()))
})

const selectedFile = ref(null);
const main = ref(null);
const filePreviewUrl = ref('');
const heightFile = ref(0);

const handleFileUpload = (event) => {
	const file = event.target.files[0];
	if (file) {
		const reader = new FileReader();
		reader.onload = (e) => {
			filePreviewUrl.value = e.target.result;
		};
		reader.readAsDataURL(file);
		selectedFile.value = file;
		heightFile.value = 42
		if (window.innerWidth <= 830) {
			main.value.style.height = (window.innerHeight - fileUploadVar.value) + 'px'
		}
	}
};

const sendMessage = () => {
	if (newMessage.value.trim() !== '' || selectedFile.value) {
		const message = {
				text: newMessage.value.trim(),
				time: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
				own: true,
				file: filePreviewUrl.value ? { url: filePreviewUrl.value, name: selectedFile.value.name } : null
		};

		currentChat.value.messages.push(message);
		newMessage.value = '';
		filePreviewUrl.value = '';
		selectedFile.value = null;
		heightFile.value = 0
		if (window.innerWidth <= 830) {
			main.value.style.height = (window.innerHeight - sendVar.value) + 'px'
		}
	}
};
const comeBackChats = () => {
	chatSelected.value = false
	document.body.classList.remove('_lock');

	setTimeout(() => {
		currentChatId.value = 0
	}, 300);
}
const isMobile = ref(false)
const sendVar = ref(196)
const fileUploadVar = ref(238)

const checkMobile = () => {
	isMobile.value = window.innerWidth <= 830 ? true : false
}

const fileUploadMargins = () => {
	fileUploadVar.value = window.innerWidth <= 540 ? 268 : 238
}

const sendMargins = () => {
	sendVar.value = window.innerWidth <= 540 ? 268 : 196
}
onMounted(() => {
	checkMobile()
	fileUploadMargins()
	sendMargins()
	window.addEventListener('resize', checkMobile, fileUploadMargins, sendMargins)
	window.addEventListener('resize', fileUploadMargins)
})

const images = ref(null)
const showModal = ref(false);
const modalImage = ref('');

const openModal = (url) => {
	modalImage.value = url;
	showModal.value = true;
};


const closeModal = () => {
	showModal.value = false;
};

onUpdated(() => {
	images.value.forEach(img => {
		img.addEventListener('click', () => openModal(img.src));
	});
});
</script>


<template>


	<div class="message-chat">
		<div class="message-chat__total-chats total-chats">
			<div class="total-chats__search-block">
				<UInput 
					placeholder="Search Name" 
					class="total-chats__search" 
					@search="performSearch"
				/>
			</div>
			<div class="total-chats__chats">
				<transition-group name="chats">
					<div 
						v-for="chat in searchedChats" 
						:key="chat.id" 
						class="total-chats__chat" 
						@click="setChat(chat.id)"
						:class="{current: currentChatId === chat.id}"
					>
						<div class="total-chats__avatar">
							<img :src="chat.avatar" :alt="chat.name">
						</div>
						<div class="total-chats__content">
							<div class="total-chats__main">
								<div class="total-chats__name">{{ chat.name }}</div>
								<div class="total-chats__message" :class="{unread: !chat.isRead}">
									{{ chat.messages[chat.messages.length - 1].own ? 'You: ' : '' }}
									{{ chat.messages[chat.messages.length - 1].text ? chat.messages[chat.messages.length - 1].text : chat.messages[chat.messages.length - 1].file.name}}
								</div>
							</div>
							<div class="total-chats__about">
								<div class="total-chats__entry-time">
									{{ formatMessageDay(chat.messages[chat.messages.length - 1].time, false) }}
								</div>
								<span v-if="!chat.isRead" class="total-chats__unread">
									<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
										<circle cx="9" cy="9" r="4" fill="#DB5962" />
									</svg>
								</span>
								<span v-else class="total-chats__read">
									<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M13.5 5.24988L12.4425 4.19238L7.6875 8.94738L8.745 10.0049L13.5 5.24988ZM16.68 4.19238L8.745 12.1274L5.61 8.99988L4.5525 10.0574L8.745 14.2499L17.745 5.24988L16.68 4.19238ZM0.307495 10.0574L4.5 14.2499L5.5575 13.1924L1.3725 8.99988L0.307495 10.0574Z" fill="#04A4F4" />
									</svg>
								</span>
							</div>
						</div>
					</div>
				</transition-group>
			</div>
		</div>
		<div :class="{_active: chatSelected}" class="message-chat__current-chat current-chat">
			<div v-if="currentChatId === 0" class="current-chat__none">
				<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 20 20"><path fill="#04A4F4" d="M10 0c5.342 0 10 4.41 10 9.5c0 5.004-4.553 8.942-10 8.942a11 11 0 0 1-3.43-.546c-.464.45-.623.603-1.608 1.553c-.71.536-1.378.718-1.975.38c-.602-.34-.783-1.002-.66-1.874l.4-2.319C.99 14.002 0 11.842 0 9.5C0 4.41 4.657 0 10 0m0 1.4c-4.586 0-8.6 3.8-8.6 8.1c0 2.045.912 3.928 2.52 5.33l.02.017l.297.258l-.067.39l-.138.804l-.037.214l-.285 1.658a3 3 0 0 0-.03.337v.095q0 .007-.002.008c.007-.01.143-.053.376-.223l2.17-2.106l.414.156a9.6 9.6 0 0 0 3.362.605c4.716 0 8.6-3.36 8.6-7.543c0-4.299-4.014-8.1-8.6-8.1M5.227 7.813a1.5 1.5 0 1 1 0 2.998a1.5 1.5 0 0 1 0-2.998m4.998 0a1.5 1.5 0 1 1 0 2.998a1.5 1.5 0 0 1 0-2.998m4.997 0a1.5 1.5 0 1 1 0 2.998a1.5 1.5 0 0 1 0-2.998"/>
				</svg>
				<span>Select a chat room <br> to start chatting</span>
			</div>
			<div v-else class="current-chat__done">
				<div class="current-chat__header">
					<div class="current-chat__people">
						<a v-if="isMobile" class="current-chat__back" @click.prevent="comeBackChats" href="">
							<svg viewBox="0 0 62 22" 
								stroke="#141522" 
								stroke-width="3" 
								fill="none">
								<line x1="-20" y1="11" x2="40" y2="11" />
								<polyline points="30,1 40,11 30,21" />
							</svg>
						</a>
						<div class="current-chat__avatar">
							<img :src="currentChat.avatar" :alt="currentChat.name">
						</div>
						<div class="current-chat__about">
							<div class="current-chat__name">
								{{ currentChat.name }}
							</div>
							<div class="current-chat__action">
								<div v-if="currentChat.isOnline" class="current-chat__online">
									<span>
										<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
											<circle cx="9" cy="9" r="4" fill="#25C78B" />
										</svg>
									</span>
									Online
								</div>
								<div v-else class="current-chat__offline">
									<span>
										<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
											<circle cx="9" cy="9" r="4" fill="#DB5962" />
										</svg>
									</span>
								Offline
								</div>
							</div>
						</div>
					</div>
					<div class="current-chat__interaction">
						<UMiniButton class="current-chat__btn" title="_icon-video-call" />
						<UMiniButton class="current-chat__btn" title="_icon-voice-call" />
					</div>
				</div>
				<div ref="main" class="current-chat__main">
					<div 
						class="current-chat__messages" 
						v-for="(message, index) in currentChat.messages" 
						:key="index"
						
					>
						<div 
							class="current-chat__day"
							v-if="index === 0 || formatMessageDay(message.time) !== formatMessageDay(currentChat.messages[index - 1].time)"
						>
							{{ formatMessageDay(message.time) }}
						</div>
						<div 
							:class="{'current-chat__own-msg': message.own, 'current-chat__others-msg': !message.own}"
						>
							<p
								:class="{'current-chat__own-text': message.own, 'current-chat__others-text': !message.own}"
							>
								{{ message.text }}
								<img 
									v-if="message.file"
									:src="message.file.url"
									:alt="message.file.name"
									ref="images"
									class="current-chat__message-image">
							</p>
							<span 
								:class="{'current-chat__own-time': message.own, 'current-chat__others-time': !message.own}"
							>
								{{ format(parseISO(message.time), 'HH:mm') }}
							</span>
						</div>
					</div>
				</div>
				<div class="current-chat__control">
					<textarea 
						@keydown="searchKeydown" 
						type="text" 
						v-model="newMessage" 
						class="current-chat__write-message" 
						placeholder="Send your message…"
					></textarea>
					<div v-if="filePreviewUrl" class="current-chat__file-preview">
							<img :src="filePreviewUrl" alt="File preview" class="current-chat__file-image">
					</div>
					<label for="file" class="current-chat__attach-file">
							<span class="current-chat__icon _icon-msg-attachfile"></span>
					</label>
					<input 
						@change="handleFileUpload" 
						type="file" 
						id="file" 
						class="current-chat__input"
						accept="image/*"
					>
					<div @click="sendMessage" class="current-chat__send">
							<span class="_icon-msg-submit"></span>
					</div>
				</div>
			</div>
		</div>
		<div v-if="showModal" class="modal" @click="closeModal">
			<div class="modal__content" @click.stop>
				<img :src="modalImage" class="modal__image" />
				<button @click="closeModal" class="modal__close-btn">✕</button>
			</div>
		</div>
	</div>
</template>


<style lang='scss' scoped>
@import '@/assets/scss/main.scss';


.message-chat {
	display: grid;
	grid-template-columns: 400px 1fr;
	height: 100%;
	position: relative;

	@media (max-width: $laptop){
		grid-template-columns: 350px 1fr;
	}
	@media (max-width: $laptop-inter){
		grid-template-columns: 1fr;
	}
	&__total-chats {
	}
	&__current-chat {
	}
}
.total-chats {
	width: 100%;
	&__search-block {
		padding: rem(24) rem(24) 0 rem(24);
	}
	&__search {
		max-width: 352px;
		padding: rem(14) rem(28);

		@media (max-width: $laptop){
			max-width: 300px;
		}
		@media (max-width: $laptop-inter){
			min-width: 100%;
		}
	}
	&__chats {
		padding: rem(32) rem(24);
		height: 932px;
		overflow-y: auto;
		@media (max-width: $tablet){
			height: max-content;
		}

		&::-webkit-scrollbar {
			width: 10px;
			background-color: #f9f9fd;
		}

		&::-webkit-scrollbar-thumb {
			border-radius: 10px;
			background-color: $dark-blue;
		}

		&::-webkit-scrollbar-track {
			-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.2);
			border-radius: 10px;
			background-color: $light-blue;
			margin: 10px 0;

		}
	}
	&__chat {
		cursor: pointer;
		padding: rem(10) rem(20);
		border-radius: rem(10);
		display: grid;
		grid-template-columns: 48px 1fr;
		column-gap: rem(12);
		position: relative;

		&.current {
			background-color: $light-white;
		}

		&:not(:last-child) {
			margin-bottom: rem(32);

			&::after {
				content: '';
				position: absolute;
				left: 50%;
				transform: translate(-50%);
				bottom: -17px;
				width: 85%;
				height: 2px;
				background-color: $light-white;
			}
		}
	}
	&__content {
		display: flex;
		justify-content: space-between;
	}
	&__avatar {
		img {
			height: 48px;
			width: 48px;
			border-radius: 50%;
			object-fit: cover;
		}
	}
	&__main {
	}
	&__name {
		font-weight: 600;
		font-size: rem(14);
		line-height: 150%;
	}
	&__message {
		font-weight: 400;
		font-size: rem(12);
		letter-spacing: -0.01em;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis; 
		width: 200px;
		color: $light-purple;

		@media (max-width: $laptop){
			width: 150px;
		}
		@media (max-width: $laptop-inter){
			@include adaptiveValue(600, 120, 830, 'width');
		}

		&.unread {
			color: $dark-purple;
			font-weight: 500;
		}
	}
	&__about {
		text-align: end;
	}
	&__entry-time {
		font-weight: 400;
		font-size: rem(12);
		letter-spacing: -0.01em;
	}
	&__action {

	}
}
.current-chat {
	border-left: 1px solid #F8F6F7;
	border-right: 1px solid #F8F6F7;


	@media (max-width: $laptop-inter){
		z-index: 10;
		position: fixed;
		width: 100%;
		top: 0;
		left: 100%;
		transition: all 0.3s ease 0s;
		&._active {
			left: 0;
		}
	}

	&__none {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		flex-direction: column;
		gap: rem(10);

		span {
			text-align: center;
			color: $light-purple;
		}
	}
	&__done {

	}
	&__header {
		display: flex;
		justify-content: space-between;
		padding: rem(24) rem(48);
		
		@media (max-width: $mobile-sec-inter){
			flex-direction: column;
			gap: rem(20);
		}
		@media (max-width: $laptop-inter){
			background-color: $white;
		}
		@media (max-width: 375px){
			padding: rem(24) rem(24);
		}
	}
	&__people {
		display: flex;
		cursor: pointer;
	}
	&__back {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 20px;

		svg * {
			-webkit-transition-duration: 200ms;
			-o-transition-duration: 200ms;
			transition-duration: 200ms;
			-webkit-transition-property: all;
			-o-transition-property: all;
			transition-property: all;
			shape-rendering: geometricPrecision;
		}

		svg {
			width: 42px;
			height: 52px;
			transform: rotate(180deg);
			margin-left: -14px;
		}

		&:hover svg * {
			-webkit-transform: translate(10px, 0);
			-ms-transform: translate(10px 0);
			transform: translate(10px 0);
		}
	}
	&__avatar {
		margin-right: rem(12);
		img {
			height: 52px;
			width: 52px;
			border-radius: 50%;
			object-fit: cover;
		}
	}
	&__about {
		display: flex;
		flex-direction: column;
	}
	&__name {
	}
	&__action {
	}
	&__interaction {
		display: flex;
		gap: rem(24);
		@media (max-width: $mobile-sec-inter){
			justify-content: space-between;
			gap: 0;
		}
	}
	&__btn {
		color: $light-purple;
		font-size: rem(24);
		transition: all 0.3s ease 0s;
		
		@media (any-hover: hover){
			&:hover {
				color: $purple;
			}
		}
	}
	&__main {
		position: relative;
		background-color: $light-white;
		padding: rem(32);
		display: flex;
		flex-direction: column;
		gap: rem(52);
		overflow-y: auto;
		height: 800px;
		transition: all 0.1s ease 0s;


		@media (max-width: $laptop-inter){
			height: calc(100vh - 196px);
		}
		@media (max-width: $mobile-sec-inter){
			height: calc(100vh - 268px);
		}

		&::-webkit-scrollbar {
			width: 10px;
			background-color: #f9f9fd;
		}

		&::-webkit-scrollbar-thumb {
			border-radius: 10px;
			background-color: $dark-blue;
		}

		&::-webkit-scrollbar-track {
			-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.2);
			border-radius: 10px;
			background-color: $light-blue;
			margin: 10px 0;

		}
	}
	&__messages {
		div:nth-child(2) {
			margin-top: rem(64);
		}
	}
	&__day {
		position: absolute;
		left: 50%;
		transform: translate(-50%);
		font-weight: 600;
		font-size: rem(14);
		color: $white;
		background-color: rgba($dark-purple, 0.9);
		padding: rem(8) rem(12);
		border-radius: rem(10);
		line-height: 150%;
	}
	&__own-msg {
		display: flex;
		justify-content: flex-end;
		position: relative;
	}
	&__own-text {
		background-color: $dark-blue;
		padding: rem(8) rem(12);
		border-radius: rem(10) 0 rem(10) rem(10);
		font-size: rem(14);
		color: $white;
		line-height: 150%;
		overflow-wrap: break-word;
		word-break: break-word;
		display: flex;
		flex-direction: column;
		gap: rem(10);
		max-width: 500px;
	}
	&__own-time {
		position: absolute;
		right: 0;
		bottom: -25px;
		color: $light-purple;
		font-size: rem(12);
		font-weight: 400;
	}
	&__others-msg {
		display: flex;
		justify-content: flex-start;
		position: relative;
	}
	&__others-text {
		background-color: $white;
		padding: rem(8) rem(12);
		border-radius: 0 rem(10) rem(10) rem(10);
		font-size: rem(14);
		line-height: 150%;
		box-shadow: 0 1px 3px 0 rgba(84, 111, 255, 0.1);
		overflow-wrap: break-word;
		word-break: break-word;
		display: flex;
		flex-direction: column;
		gap: rem(10);
		max-width: 500px;
	}
	&__message-image {
		max-height: 140px;
		width: 100%;
		object-fit: cover;
		border-radius: 10px;
		margin: 0 auto;
		cursor: pointer;
	}
	&__others-time {
		position: absolute;
		left: 0;
		bottom: -25px;
		color: $light-purple;
		font-size: rem(12);
		font-weight: 400;
	}
	&__control {
		display: flex;
		border: 1px solid #F8F6F7;
		border-left: none;
		align-items: center;
		gap: rem(20);
		padding: rem(18) rem(32);

		@media (max-width: $laptop-inter){
			background-color: $white;
		}
	}
	&__write-message {
		width: 100%;
		font-size: rem(18);
		line-height: 150%;
		overflow-wrap: break-word;
		word-break: break-word;
		font-family: 'PlusJakartaSans';

		&::placeholder {
			font-size: rem(16);
			color: $light-purple;
		}
	}
	&__file-preview {

	}
	&__file-image {
		max-height: 100px;
		max-width: 200px;
		border-radius: 10px;

		@media (max-width: $mobile-sec-inter){
			max-height: 50px;
			max-width: 100px;
		}
	}
	&__attach-file {
		font-size: rem(24);
		cursor: pointer;
		transition: all 0.3s ease 0s;

		@media (any-hover: hover){
			&:hover {
				color: $dark-blue;
				transform: scale(1.2);
			}
		}
	}
	&__input {
		display: none;
	}
	&__send {
		border-radius: 10px;
		padding: 10px;
		width: 46px;
		height: 44px;
		background-color: $dark-blue;
		color: $white;
		font-size: rem(19);
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: all 0.3s ease 0s;

		@media (any-hover: hover){
			&:hover {
				transform: scale(0.95);
			}
		}
	}
}
.current-chat__day {
	font-weight: 600;
	font-size: rem(14);
	color: $white;
	background-color: rgba($dark-purple, 0.9);
	padding: rem(8) rem(12);
	border-radius: rem(10);
	line-height: 150%;
	text-align: center;
}
.chats-move,
.chats-enter-active,
.chats-leave-active {
	transition: all 0.5s ease;
}
.chats-enter-from,
.chats-leave-to {
	opacity: 0;
	transform: scale(0.1);
}
.chats-leave-active {
	position: absolute;
}
.modal {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.8);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 1000;
	&__content {
		position: relative;
		max-width: 90%;
		max-height: 90%;
	}

	&__image {
		max-width: 100%;
		max-height: 100%;
		object-fit: contain;
		border-radius: 10px;
	}

	&__close-btn {
		position: absolute;
		top: 10px;
		right: 10px;
		background-color: $medium-white;
		color: $dark-purple;
		border: none;
		border-radius: 50%;
		width: 40px;
		height: 40px;
		font-size: 24px;
		cursor: pointer;
		transition: all 0.3s ease 0s;

		@media (any-hover: hover){
			&:hover {
				background-color: $light-blue;
			}
		}
	}
}
</style>