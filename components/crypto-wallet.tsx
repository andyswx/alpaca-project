'use client'

import { useState, useRef } from 'react'
import { Bell, Home, Rocket, FileText, User, Wallet, PlusCircle } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import Confetti from 'react-confetti'

export function CryptoWalletComponent() {
  const [currentPage, setCurrentPage] = useState('home')
  const [isConfettiActive, setIsConfettiActive] = useState(false)
  const [isTransactionComplete, setIsTransactionComplete] = useState(false)
  const [confettiOrigin, setConfettiOrigin] = useState({ x: 0, y: 0, w: 0, h: 0 })
  const [amount, setAmount] = useState('')
  const [message, setMessage] = useState('')
  const sendButtonRef = useRef<HTMLButtonElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // const handleSend = () => {
  const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (sendButtonRef.current && containerRef.current) {
      const rect = sendButtonRef.current.getBoundingClientRect()
      const containerRect = containerRef.current.getBoundingClientRect()
      setConfettiOrigin({
        x: rect.left - containerRect.left + rect.width / 2,
        y: rect.top - containerRect.top + rect.height / 2,
        w: 10,
        h: 10
      })
    }
    setIsConfettiActive(true)
    setIsTransactionComplete(true)
    setTimeout(() => {
      setIsConfettiActive(false)
    }, 3000)
  }

  const handleCloseTransactionModal = () => {
    setIsTransactionComplete(false)
    setCurrentPage('home')
  }

  const renderHomePage = () => (
    <div className="flex flex-col h-full">
      <header className="p-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-pink-400 rounded-full flex items-center justify-center">
            <span className="text-white text-2xl">🐷</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-black">GM, Joseph Phillips</h1>
            <p className="text-sm text-gray-600">@jo.phillips</p>
          </div>
        </div>
        <Bell className="text-gray-600" />
      </header>

      <div className="flex-grow overflow-auto px-4 pb-20">
        <div className="flex justify-between p-4 bg-white rounded-lg mt-4">
          <div>
            <p className="text-sm text-gray-600">Total balance</p>
            <p className="text-2xl font-bold text-black">$8,581.58</p>
          </div>
          <div className="flex flex-col items-end">
            <p className="text-sm text-gray-600">Earned</p>
            <a href="#" className="text-blue-500">Earn passively</a>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-black">Cards</h2>
            <button className="text-blue-500">Add another card +</button>
          </div>
          <div className="bg-purple-500 p-4 rounded-lg text-white">
            <p className="mb-4">Joseph Phillips</p>
            <p className="mb-4">**** **** **** 8543</p>
            <p className="text-2xl font-bold">$300.00</p>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold text-black mb-2">Wallets</h2>
          <div className="bg-gradient-to-r from-orange-400 to-red-500 p-4 rounded-lg text-white">
            <p>Primary</p>
            <p className="text-sm mb-2">0x35s6e...7be65</p>
            <p className="text-2xl font-bold">$2,328.50</p>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold text-black mb-2">Balances</h2>
          <div className="space-y-4">
            {[
              { name: 'Tether USD', symbol: 'USDT', balance: '$18.76', change: '+ 0.81%' },
              { name: 'Circle USD', symbol: 'USDC', balance: '$10.638', change: '+ 0.56%' },
              { name: 'Circle EUR', symbol: 'CEUR', balance: '$8.00', change: '+ 0.00%' },
            ].map((coin) => (
              <div key={coin.symbol} className="flex items-center justify-between bg-white p-3 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-black">
                    {coin.symbol[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-black">{coin.name}</p>
                    <p className="text-sm text-gray-600">{coin.symbol}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-black">{coin.balance}</p>
                  <p className="text-sm text-green-500">{coin.change}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderSendPage = () => (
    <div className="flex flex-col h-full">
      <header className="p-4 bg-black text-white">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Wallet</h1>
          <Button variant="outline" size="sm" className="text-black border-white bg-white hover:bg-gray-100">
            <PlusCircle className="mr-2 h-4 w-4" /> Connect wallet
          </Button>
        </div>
        <div className="mt-4">
          <Wallet className="inline-block mr-2" />
          <span className="text-3xl font-bold">$2,470</span>
        </div>
      </header>

      <div className="flex-grow overflow-auto px-4 pb-20">
        <Tabs defaultValue="now" className="w-full mt-4">
          <TabsList className="w-full">
            <TabsTrigger value="now" className="flex-1">Now</TabsTrigger>
            <TabsTrigger value="later" className="flex-1">Later</TabsTrigger>
            <TabsTrigger value="recurring" className="flex-1">Recurring</TabsTrigger>
          </TabsList>
          <TabsContent value="now" className="mt-4">
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSend(e); }}>
              <div>
                <label className="block text-sm font-medium text-gray-700">Sending to</label>
                <div className="flex items-center mt-1">
                  <Avatar className="h-10 w-10 bg-red-400">
                    <AvatarFallback>JC</AvatarFallback>
                  </Avatar>
                  <span className="ml-3 font-medium">Jordan Christiansen</span>
                </div>
              </div>
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  // onChange={(e) => setAmount(e.target.value)}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)}
                  className="pl-8"
                />
              </div>
              <div>
                <label htmlFor="chain" className="block text-sm font-medium text-gray-700">Chain</label>
                <Select>
                  <SelectTrigger id="chain">
                    <SelectValue placeholder="Chain with highest balance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="arbitrum">Arbitrum</SelectItem>
                    <SelectItem value="ethereum">Ethereum</SelectItem>
                    <SelectItem value="optimism">Optimism</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label htmlFor="token" className="block text-sm font-medium text-gray-700">Token</label>
                <Select>
                  <SelectTrigger id="token">
                    <SelectValue placeholder="Select token" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usdt">USDT $2400</SelectItem>
                    <SelectItem value="usdc">USDC $70</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <Textarea
                  id="message"
                  placeholder="Enter a message"
                  value={message}
                  // onChange={(e) => setMessage(e.target.value)}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full" ref={sendButtonRef}>Send</Button>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 p-4">
      <div 
        ref={containerRef}
        className="w-[393px] h-[852px] bg-gray-100 overflow-hidden rounded-3xl shadow-xl flex flex-col relative"
      >
        {currentPage === 'home' ? renderHomePage() : renderSendPage()}

        <nav className="absolute bottom-0 left-0 right-0 flex justify-between items-center p-4 bg-white">
          <button onClick={() => setCurrentPage('home')} aria-label="Home">
            <Home className={currentPage === 'home' ? "text-blue-500" : "text-gray-600"} />
          </button>
          <FileText className="text-gray-600" />
          <button
            className="bg-orange-500 text-white p-3 rounded-full absolute left-1/2 -translate-x-1/2 -top-6"
            onClick={() => setCurrentPage('send')}
            aria-label="Send"
          >
            <Rocket />
          </button>
          <Bell className="text-gray-600" />
          <User className="text-gray-600" />
        </nav>

        <Dialog open={isTransactionComplete} onOpenChange={handleCloseTransactionModal}>
          <DialogContent className="z-50">
            <DialogHeader>
              <DialogTitle>Transaction complete! 🎉</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              Your transaction has been successfully processed.
            </DialogDescription>
            <DialogFooter>
              <Button onClick={handleCloseTransactionModal}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {isConfettiActive && (
          <div className="absolute inset-0 z-[60] pointer-events-none">
            <Confetti
              width={393}
              height={852}
              recycle={false}
              numberOfPieces={200}
              confettiSource={confettiOrigin}
              initialVelocityX={-5}
              initialVelocityY={25}
              gravity={0.3}
              tweenDuration={100}
              spread={180}
            />
          </div>
        )}
      </div>
    </div>
  )
}