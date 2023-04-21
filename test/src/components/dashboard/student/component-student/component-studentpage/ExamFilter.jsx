import React, { useState } from 'react';

function ExamFilter({ isOpen, setIsOpen, setSearchParams }) {
	const initialFilter = {
		text: 'Tất cả',
		value: 'all',
	};
	const [selected, setSelected] = useState(initialFilter);
	const handleChangeSelect = ({ innerHTML, value }) => {
		setSelected({ text: innerHTML, value });
	};
	return (
		<div>
			<div class="filter-box">
				<div class="custom-select">
					<span
						class="selected-option"
						style={{
							boxShadow: isOpen ? 'inset 0 0 0 1px #888' : '',
						}}
						onClick={() => setIsOpen(!isOpen)}
					>
						{selected.text}
						<i class="fa-solid fa-chevron-down"></i>
					</span>
					{isOpen && (
						<ul
							class="custom-select__option-list"
							onClick={(e) => {
								if (!e.target.closest('option')) return;
								const optionInput = e.target.closest('option');
								handleChangeSelect(optionInput);
								setSearchParams({ sort: e.target.value });
							}}
						>
							<li
								class={`option flex-center ${
									selected.text === 'Tất cả' ? 'selected' : ''
								}`}
							>
								<option value="all">Tất cả</option>
							</li>
							<li
								class={`option flex-center ${
									selected.text === 'Đã làm' ? 'selected' : ''
								}`}
							>
								<option value="1">Đã làm</option>
							</li>
							<li
								class={`option flex-center ${
									selected.text === 'Chưa làm' ? 'selected' : ''
								}`}
							>
								<option value="0">Chưa làm</option>
							</li>
						</ul>
					)}
				</div>
			</div>
		</div>
	);
}

export default ExamFilter;
