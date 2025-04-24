<script>
    import Breadcrumb from "@components/Breadcrumb.svelte";
    import { userEditStore } from "@store/users/UserEditStore";

    const state = userEditStore;
</script>

<div class="profile-container flex-1 px-10 pt-4">
    <Breadcrumb></Breadcrumb>

    <div class="flex gap-10 justify-between">
        <div class="profile-sidebar max-w-lg">
            <div class="avatar-wrapper">
                <img src={$state.avatar} alt="Profile Avatar" class="avatar" />
                <button class="change-avatar-btn">Change picture</button>
            </div>
        </div>

        <div class="profile-main bg-red-10 flex-1 flex justify-center">
            <form class="profile-form w-xl">
                <div class="form-group">
                    <label for="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Your name"
                        required
                        value={$state.name}
                    />
                </div>

                <div class="form-group">
                    <label for="bio">Bio</label>
                    <textarea
                        id="bio"
                        name="bio"
                        rows="3"
                        placeholder="Add a bio"
                        maxlength="500"
                    ></textarea>
                    <small class="char-count">0/500</small>
                </div>

                <div class="form-group">
                    <label for="company">Company</label>
                    <input
                        type="text"
                        id="company"
                        name="company"
                        placeholder="Where do you work?"
                    />
                </div>

                <button type="submit" class="save-btn">Update profile</button>
            </form>
        </div>
    </div>
</div>

<style>
    .profile-container {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        margin: 0 auto;
        background: #f8f9fa;
    }

    .avatar-wrapper {
        text-align: center;
    }

    .avatar {
        width: 100%;
        max-width: 200px;
        border-radius: 50%;
        margin-bottom: 1rem;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s;
    }

    .avatar:hover {
        transform: scale(1.05);
    }

    .change-avatar-btn {
        width: 100%;
        padding: 0.5rem;
        background: #f6f8fa;
        border: 1px solid #e1e4e8;
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.2s;
    }

    .change-avatar-btn:hover {
        background: #e1e4e8;
    }

    .profile-form {
        background: #fff;
        border: 1px solid #e1e4e8;
        border-radius: 6px;
        padding: 1.5rem;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }

    .form-group {
        margin-bottom: 1.5rem;
        position: relative;
    }

    label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 600;
        color: #24292e;
    }

    input,
    textarea {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid #e1e4e8;
        border-radius: 6px;
        font-size: 0.875rem;
        transition: border-color 0.2s;
    }

    input:focus,
    textarea:focus {
        border-color: #0366d6;
        outline: none;
        box-shadow: 0 0 0 3px rgba(3, 102, 214, 0.1);
    }

    textarea {
        resize: vertical;
        min-height: 100px;
    }

    .save-btn {
        background: #2ea44f;
        color: white;
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: 6px;
        font-size: 0.875rem;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.2s;
        width: 100%;
    }

    .save-btn:hover {
        background: #2c974b;
    }

    @media (max-width: 768px) {
        .profile-container {
            grid-template-columns: 1fr;
        }

        .avatar-wrapper {
            margin-bottom: 2rem;
        }
    }
</style>
