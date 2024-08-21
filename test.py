# Definition for singly-linked list.
class ListNode:
     def __init__(self, val=0, next=None):
         self.val = val
         self.next = next
class Solution:
    def swapPairs(self, head: ListNode) -> ListNode:
        if(not head or not head.next):
            return head

        p1 = head
        p2 = head.next.next
        prev = None

        while(True):
            p1.next.next = p1
            if(prev != None):
                prev.next = p1.next

            #Iterate
            prev = p1
            p1 = p2
            if(p2 and p2.next):
                p2 = p2.next.next
            else:
                break


        return head.next
    

head = ListNode(1)
head.next = ListNode(2)
head.next.next = ListNode(3)
head.next.next.next = ListNode(4)

Solution().swapPairs(head)