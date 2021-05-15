import React from "react";
import EditBasicDetails from "./EditBasicDetails";
import EditObject from "./EditObject";
import EditArray from "./EditArray";
import EditOthersDetails from "./EditOthersDetails";
import EditPostDetails from "./EditPostDetails";

const EditTextPost = ({active, post, setPost, triggerSubmit}) => {
  return <> {active.key === "basicDetails" &&
  <EditBasicDetails post={post} setPost={setPost} triggerSubmit={triggerSubmit}/>}
    {["vacancyDetails", "ageLimit", "feeDetails", "dates", "importantLinks"].map((key, index) => {
      return active.key === key && <EditObject key={`key-${index}`} keyName={active.key} post={post} setPost={setPost}
                                               triggerSubmit={triggerSubmit}/>
    })}
    {["howToApply", "selectionProcess"].map(key => {
      return active.key === key && <EditArray key={active.key} keyName={active.key} post={post} setPost={setPost}
                                              triggerSubmit={triggerSubmit}/>
    })}
    {active.key === "others" && <EditOthersDetails post={post} setPost={setPost} triggerSubmit={triggerSubmit}/>}
    {!active.key && <EditPostDetails post={post} setPost={setPost} triggerSubmit={triggerSubmit}/>}
  </>
}

export default EditTextPost
