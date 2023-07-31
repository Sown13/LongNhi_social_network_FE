export default function UserAction(relationship, user) {
    if (relationship.sourceUser.userId == 0) {
        return (
            <div>
                <button > Thêm bạn</button>
                <button> Nhắn tin</button>
            </div>
        )
    } else if (relationship.accepted == true) {
        return (
            <div>
                <button > Xóa Bạn</button>
                <button> Nhắn tin</button>
            </div>
        )
    } else if (relationship.sourceUser.userId == user.userId) {
        return (
            <div>
                <button> Hủy lời mời</button>
                <button> Nhắn tin</button>
            </div>
        )
    } else return (<div>
        <button> Đồng ý/ Từ chối</button>
        <button> Nhắn tin</button>
    </div>)

}